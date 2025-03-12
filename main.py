from fastapi import FastAPI, Request, HTTPException
 
app = FastAPI()
 
@app.get("/data")
def get_data(request: Request):
    # The API Gateway should forward the "Authorization" header with the Bearer token.
    # auth_header = request.headers.get("Authorization")
    # if not auth_header:
    #    raise HTTPException(status_code=401, detail="Unauthorized")
    
    # For demonstration, we simply return the token received.
    # token = auth_header.split(" ")[1] if " " in auth_header else auth_header
    return {"message": "Secure data from FastAPI"}
 
@app.get("/hello")
def hello():
    return {"message": "Hello from FastAPI backend!"}