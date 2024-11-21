import mysql.connector
from mysql.connector import Error
import time
from log import file_write

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

    except Error as e:
        file_write("____________MYSQL__________________", e)
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

# Function to connect to the database
def updateCorp(vi_name:str, tax_code:str, address:str, link:str , page_id:int, code:int) -> bool:
    global connection

    try:
        if connection.is_connected():
            cursor = connection.cursor()

            sql_insert_query = """INSERT INTO TBCorp_other (vi_name, tax_code, address, link , page_id, code) VALUES (%s, %s, %s, %s, %s, %s)"""
            record_tuple = (vi_name, tax_code, address, link , page_id, code)

            cursor.execute(sql_insert_query, record_tuple)

            connection.commit()
        else:
            # Reconnect to the database
            if reconnect():
                updateCorp(vi_name, tax_code, address, link , page_id)
    except Error as e:
        file_write("____________MYSQL__________________", e, vi_name, tax_code, address, link , page_id, code)
        raise e
    finally:
        cursor.close()

    return True

# Function to get the link from the database
def get_link(code:int, offset:int) -> list:
    global connection
    try:
        if connection.is_connected():
            cursor = connection.cursor()

            sql_select_query = """Select id, link from TBCorp where code = %s and isActive = 1 and corp_type = 'TNHH' and id > %s and is_next = 0 ORDER by id ASC LIMIT 1000"""
            record_tuple = (code, offset)

            cursor.execute(sql_select_query, record_tuple)

            records = cursor.fetchall()

            if not records:
                return None, None

            # Get max id
            id_max = records[len(records)-1][0]
            return records, id_max
        else:
            # Reconnect to the database
            if reconnect():
                get_link(code, offset)
    except Error as e:
        file_write(rf"____________MYSQL__________________ Code {code} offset {offset}", e)
        raise e
    finally:
        cursor.close()

    return None

def insertTBCorpActivation(id_corp:int) -> bool:
    global connection

    try:
        if connection.is_connected():
            cursor = connection.cursor()

            sql_insert_query = """INSERT INTO TBCorpActivation (id_corp) VALUES (%s)"""
            record_tuple = (id_corp, )

            cursor.execute(sql_insert_query, record_tuple)

            connection.commit()
        else:
            # Reconnect to the database
            if reconnect():
                updateCorp(id_corp)
    except Error as e:
        file_write(rf"____________MYSQL__________________{id_corp} :::", e)
        raise e
    finally:
        cursor.close()

    return True

def insertCorpActiveDate(id_corp:int, active_date:str, person:str) -> bool:
    global connection

    try:
        if connection.is_connected():
            cursor = connection.cursor()

            sql_insert_query = """INSERT INTO TBCorpActiveDate (id_corp, active_date, person) VALUES (%s, %s, %s)"""
            record_tuple = (id_corp, active_date, person)

            cursor.execute(sql_insert_query, record_tuple)

            connection.commit()
        else:
            # Reconnect to the database
            if reconnect():
                updateCorp(id_corp, active_date, person)
    except Error as e:
        file_write(rf"____________MYSQL__________________{id_corp} :::", e)
        raise e
    finally:
        cursor.close()

    return True



def inserIndustryCode(lst) -> bool:
    global connection

    try:
        if connection.is_connected():
            cursor = connection.cursor()

            sql_insert_query = """INSERT INTO TBIndustryCode (id_corp, industry_code, type) VALUES (%s, %s, %s)"""
            
            cursor.executemany(sql_insert_query, lst)

            connection.commit()
        else:
            # Reconnect to the database
            if reconnect():
                updateCorp(lst)
    except Error as e:
        file_write(rf"____________MYSQL__________________{000} :::", e)
        raise e
    finally:
        cursor.close()

    return True