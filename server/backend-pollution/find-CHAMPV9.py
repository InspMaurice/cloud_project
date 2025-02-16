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

@app.route('/champv9-finder/<path:subpath>', methods=['GET'])
def car_research(subpath):

    sql_resquest = "SELECT Annee FROM cars WHERE id = " + subpath.split("=")[1]

    result = sql_request_todb(sql_resquest)[0][0]

    if result < 1996:
        answer = "EURO1"
    elif result < 2000:
        answer = "EURO2"
    elif result < 2006:
        answer = "EURO3"
    elif result < 2011:
        answer = "EURO4"
    elif result < 2015:
        answer = "EURO5"
    else:
        answer = "EURO6"


    return jsonify(answer)


if __name__ == '__main__':
    app.run(debug=True)
