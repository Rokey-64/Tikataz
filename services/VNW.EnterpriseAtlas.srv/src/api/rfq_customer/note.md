
# This API group is used to post user's RFQ to MySQL
# It will be implemented through the steps below:
>> Step 1: Require for a new key
    API: Create a new API /vmw/rfq/init
    Desc: Generate a 21-character nanoid key and push to Redis if the user limmit is not reached

>> Step2: insert this RFQ
    API: Create a new API
    Desc: Check the data first and then insert them to Database
    ** Check: Valid key, Valid data fields
    ** Insert: Image to Azure Storage / Data to MySQL