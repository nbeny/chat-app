#!/bin/bash

# Sign In Solution
curl -d "email=qwerqwer@qwer.qwer&password=qwerqwer" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/v1/users

# Login Solution
curl -d "email=qwerqwer@qwer.qwer&password=qwerqwer" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/v1/users/login

# Get with User Token
curl -d "email=qwerqwer@qwer.qwer&password=qwerqwer" -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWNkNDdiZWY0MTU4YzI1NmM2ZjUxMGU0IiwiaWF0IjoxNTU3NDI5MjM3LCJleHAiOjE1NTc0MzkyMzd9.5cc5T8ZwS4psbqmHgrBX18lzgWYDEKCwMERenijsr70" -X GET http://localhost:3000/v1/users/
