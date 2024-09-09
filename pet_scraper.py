import time
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests
from mongoengine import connect, Document, StringField, ListField, URLField
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env.local")
mongo_uri = os.getenv("MONGODB_URI")
connect(host=mongo_uri)


class Pet(Document):
    meta = {'collection': 'pets'}
    name = StringField()
    breed = StringField()
    shelter = StringField()
    gender = StringField()
    description = StringField()
    location = StringField()
    photoUrl = URLField()
    characteristics = ListField(StringField())


def scrape_pet_details(url, limit):
    driver = webdriver.Chrome()
    driver.get(url)

    WebDriverWait(driver, 20).until(
        lambda driver: driver.execute_script("return document.readyState") == "complete"
    )

    shadow_host = WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "pet-scroller"))
    )
    shadow_root = driver.execute_script("return arguments[0].shadowRoot", shadow_host)

    # Find all pet links
    pet_links = shadow_root.find_elements(By.CSS_SELECTOR, "a.petCard")[:limit]
    print(pet_links)
    for link in pet_links:
        pet_url = link.get_attribute("href")
        driver.execute_script("window.open('');")
        driver.switch_to.window(driver.window_handles[-1])
        driver.get(pet_url)

        # Wait for pet details to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "card-section"))
        )
        # Parse the page content
        soup = BeautifulSoup(driver.page_source, "html.parser")

        # Extract pet details (adjust selectors as needed)
        name = soup.find("span", attrs={"data-test": "Pet_Name"}).text.strip()
        breed = soup.select_one('span[data-test="Pet_Breeds"] a').text.strip()
        location = soup.find("span", attrs={"data-test": "Pet_Location"}).text.strip()
        photoUrl = soup.select_one("img.petCarousel-body-slide")["src"]
        description = (
            soup.find("div", attrs={"data-test": "Pet_Story_Section"})
            .get_text(separator="\n")
            .strip()
        )

        # Create and save Pet object to MongoDB
        pet = Pet(
            name=name,
            breed=breed,
            location=location,
            photoUrl=photoUrl,
            description=description,
        )
        pet.save()

        print(f"Saved {name} to database")

        driver.close()
        driver.switch_to.window(driver.window_handles[0])

    driver.quit()


# Usage
url = "https://arne-ri.org/available-dogs/"
scrape_pet_details(url, 25)
