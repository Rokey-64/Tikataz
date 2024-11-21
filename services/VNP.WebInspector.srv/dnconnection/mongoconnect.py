from pymongo import MongoClient, errors

# client = MongoClient('localhost', 27017)


def insert_tag(tag):
    client = MongoClient('mongodb://admin:Tikcom%40192.168.1.1%40hnlhnl123@103.218.122.181:27017/admin', 27017)
    db = client['VNW']
    collection = db['tags']
    try:
        # Thêm document vào collection
        result = collection.insert_one(tag)
        print(f"Document đã được thêm với _id: {result.inserted_id}")
    except errors.DuplicateKeyError as e:
        print("Lỗi: Trùng lặp _id! Không thể thêm document.")
        return
    except errors.PyMongoError as e:
        print(f"Lỗi MongoDB: {e}")
        return
    except Exception as e:
        print(f"Lỗi không xác định: {e}")
        return
    