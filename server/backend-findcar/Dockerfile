
# Use the official Python image from the Docker Hub
FROM python:3.12

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .
# Print the copied files
RUN ls -la

# Expose the port the app runs on
EXPOSE 5000

# Set environment variables
ENV FLASK_APP=database-communication.py

# Run the application
CMD ["flask", "run", "--host=0.0.0.0"]
