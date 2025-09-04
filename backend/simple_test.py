#!/usr/bin/env python3
"""
测试API注册功能
"""
import requests
import json

def test_register():
    url = "http://localhost:8001/api/register"
    data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "testpass123"
    }
    
    try:
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("SUCCESS: Registration worked")
        else:
            print("FAILED: Registration failed")
    except Exception as e:
        print(f"FAILED: Request failed: {e}")

if __name__ == "__main__":
    test_register()