from datetime import datetime

# Function to write to a file when an error occurs
def file_write(posLink, content):
    with open('log.txt', 'a') as f:
        line = f"{datetime.now()} - {posLink} - {content}"
        f.write('\n' + line)
