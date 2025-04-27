
# This API group is used to insert a new custom card or update an existing card
# ULM is implemented step by step below:
>> Step 1: Check the use is reaching the limmit cards before creating a new card
    API: Create a new API
    Desc:
>> Step 2: Check valid and Update Card's data side to Redis // prepare for next step
>> Step 3: Update images (product's images, card logo, customer logo) to Azure Storage, Insert/update Card's data(*.json) to database