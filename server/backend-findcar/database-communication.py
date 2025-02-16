import flask
from flask import request, jsonify
import time
import psycopg2
import os
from dotenv import load_dotenv



load_dotenv()

DB_NAME = os.getenv("POSTGRES_DB")
DB_USER = os.getenv("POSTGRES_USER")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB_HOST = os.getenv("POSTGRES_HOST")
DB_PORT = os.getenv("POSTGRES_PORT")


def arguments_to_sql_request(arguments):
    sql_to_add = ""

    for i in range(len(arguments)):
        if '<' in arguments[i]:
            column, value = arguments[i].split('<')
            sql_to_add += f"{column} < '{value}'"
        elif '>' in arguments[i]:
            column, value = arguments[i].split('>')
            sql_to_add += f"{column} > '{value}'"
        elif '=' in arguments[i]:
            column, value = arguments[i].split('=')
            sql_to_add += f"{column} = '{value}'"
        
        if i < len(arguments) - 1:
            sql_to_add += " AND "

    return sql_to_add


def sql_request_todb(sql_request):
    
    load_dotenv()

    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        client_encoding="UTF8"
    )
    cur = conn.cursor()
    cur.execute(sql_request)
    answer = cur.fetchall()
    print("requete sql :", sql_request)
    print("Resultat de la requete :", answer)

    cur.close()
    conn.close()

    return answer


app = flask.Flask(__name__)

@app.route('/car-research/<path:subpath>', methods=['GET'])
def car_research(subpath):
    arguments = subpath.split('/')
    if len(arguments) < 1:
        return jsonify("No arguments provided.")


    if "page" in arguments[-1]:
        if int(arguments[-1].split('=')[1]) > int(sql_request_todb("SELECT COUNT(*) FROM cars WHERE "+ arguments_to_sql_request(arguments[:-1]) + ";")[0][0])/20:
            return jsonify("Page number too high.")
        else:
            sql_request = "SELECT * FROM cars WHERE "
            sql_request += arguments_to_sql_request(arguments[:-1])
            sql_request += " LIMIT 20 OFFSET " + str((int(arguments[-1].split('=')[1])-1)*20 + 20)
    else:
        sql_request = "SELECT COUNT(*) FROM cars WHERE "
        sql_request += arguments_to_sql_request(arguments)


    sql_request += ";"


    answer = sql_request_todb(sql_request)
    return jsonify(answer)


if __name__ == '__main__':
    app.run(debug=True)
