import mysql.connector
from mysql.connector import Error
import time

# Khai báo biến connection trước khi vào khối try
connection = None

# Hàm để tạo kết nối đến cơ sở dữ liệu
def create_connection():
    global connection
    try :
        connection = mysql.connector.connect(host='103.218.122.181',
                                            database='VNR.Crawl',
                                            user='admin',
                                            password='Tikcom@192.168.1.1@hnlhnl123',
                                            port='3306'
                                            )
        # connection = mysql.connector.connect(host='localhost',
        #                                     database='VNR.Crawl',
        #                                     user='admin',
        #                                     password='Tikcom@hnlhnl123',
        #                                     port='3306'
        #                                     )

    except Error as e:
        print("Error while connecting to MySQL", e)

# Hàm để kết nối lại cơ sở dữ liệu
def reconnect():
    global connection
    i = 0
    while connection.is_connected() is False:
        create_connection()
        i+=1
        time.sleep(1)
        if i == 10:
            return False
    return True

# Tạo kết nối đến cơ sở dữ liệu
create_connection()

# Function to get the link from the database
def geturls(index:int) -> list:
    global connection
    try:
        if connection.is_connected():
            cursor = connection.cursor()

            sql_select_query = """Select link, id from TBCorpGeneralWebsite_2 where id >= %s limit 100"""
            record_tuple = (index,)

            cursor.execute(sql_select_query, record_tuple)

            records = cursor.fetchall()

            if not records:
                return None, None

            return records
        else:
            # Reconnect to the database
            if reconnect():
                geturls(index)
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        cursor.close()

    return None
