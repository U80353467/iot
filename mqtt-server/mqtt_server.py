import paho.mqtt.client as mqtt
import time
import json
import mysql.connector
import sys

host = "mosquitto"
port = 1883
db = mysql.connector.connect(
        host="database",
        port="3306",
        user="root",
        password="123456",
        database="iot__"
    )


def server_start():
    client_id = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
    client = mqtt.Client(client_id)
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(host, port, 60)
    client.loop_forever()


def on_connect(client, user_data, flags, rc):
    client.subscribe("testapp")
    print("Connected with result code " + str(rc))
    sys.stdout.flush()  # 迫使输出缓冲区刷新


def on_message(client, user_data, msg):
    print("Receive Message!")
    sys.stdout.flush()  # 迫使输出缓冲区刷新
    msg_json = json.loads(msg.payload.decode("utf-8"))
    write_into_db(msg_json)


def write_into_db(msg_json):
    cursor = db.cursor()
    clientid = int(msg_json["clientId"].lstrip("device"))
    select_sql = "SELECT deviceName FROM device WHERE deviceId = {}".format(clientid)
    cursor.execute(select_sql)
    select_res = cursor.fetchone()
    if select_res:
        devicename = select_res[0]
    else:
        return
    msg_sql = ("INSERT INTO `message` (clientId, info, value, alert, lng, lat, timestamp) "
               "VALUES('{}', '{}', {}, {}, {}, {}, {});").format(
        devicename, msg_json["info"], msg_json["value"], msg_json["alert"],
        msg_json["lng"], msg_json["lat"], msg_json["timestamp"]
    )
    print("Insert message concerning " + devicename)
    sys.stdout.flush()  # 迫使输出缓冲区刷新
    cursor.execute(msg_sql)
    db.commit()


if __name__ == '__main__':
    server_start()
    db.close()
