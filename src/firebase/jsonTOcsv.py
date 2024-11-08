import json
#import csv
#import os
#import pandas as pd
#from datetime import datetime


# approach 2: just using json library 
# Function to read json file
def read_json(filename):
    # Check if file exists
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
    except:
        raise Exception("Error reading json file")
    
    return data

# function to normalize json data
def normalize_json(data):
    new_data = dict()
    for key, value in data.items():
        if not isinstance(value, dict):
            new_data[key] = value
        else:
            for k, v in value.items():
                new_data[key + "_" + k] = v

    return new_data                              
   
# Function to generate csv file
def generate_csv(data):

    # defining csv columns in a list to maintin the order
    csv_columns = data.keys()

    # generate the first row of the csv file
    csv_data = ",".join(csv_columns) + "\n"

    # generate the single recod present 
    new_row = list()
    for col in csv_columns:
        new_row.append(str(data[col]))

    # concatenate the record with the column information in csv format 
    csv_data += ",".join(new_row) + "\n"

    return csv_data

# function tpo flatten json 
def flatten_json(data, prefix = ''):
    flatJson = {}
    for key, value in data.items():
        if isinstance(value, dict):
            flatJson.update(flatten_json(value, prefix + key + '_'))
        else:
            flatJson[prefix + key] = value
    return flatJson


# Function to write data to file
def write_to_file(data, filepath):
    
    try:
        with open(filepath, 'w') as f:
            f.write(data)
    except:
        raise Exception("Error writing to file")
    

# main function
def main():
    # read the json file as python dictionary
    # make this as a input from the user
    data = read_json(filename= 'C:/Users/adamc/Downloads/exported-json-data-2024-10-30T14-15-57.374Z.json')

    # normalize the nested python dictionary
    new_data = normalize_json(data=data)

    # pretty print the normalized data
    #print("New dictionary: ", new_data)

    # flatten the json data
    flat_json = flatten_json(data)
    print("Flattened json: ", flat_json)

    # generate desired csv data 
    csv_data = generate_csv(data=flat_json)

    #save the csv data to a file
    write_to_file(data=csv_data, filepath='data.csv')

   
# ===========================================================================================================================================
# apporoach 1: using pandas ==== library issues

# # Function to read json file
# def read_json(filename):
#     # Check if file exists
#     try:
#         with open(filename, 'r') as f:
#             data = json.load(f)
#     # If file does not exist, raise exception
#     except:
#         raise Exception("Error reading json file")
#     # Return data
#     return data

# def create_dataframe(data):
#     # Create dataframe
#     df = pd.DataFrame()
#     # looping throug each record
#     for d in data:
#         # normalize column levels 
#         record = pd.json_normalize(d)

#         # append it to the dataframe
#         df = df.append(record, ignore_index=True)   
#     return df

# # main function
# def main():
#     # read json file
#     data = read_json(filename= 'C:/Users/adamc/Downloads/exported-json-data-2024-10-30T14-15-57.374Z.json')
#     # generate the datarame for the array items in key
#     # key is the array of the json in which you are pulling from 
#     df = create_dataframe(data = data)


#     # rename the colums in dataframe
#     print("normalized columns", df.columns.to_list())
#     df.rename(columns = {'CurricularID':'GameID'}, inplace=True)

#     print("renamed columns", df.columns.to_list())

#     # write the dataframe to csv
#     df.to_csv('data.csv', index=False)

if __name__ == "__main__":
    main()


