# Keptn Notification Service

This notification service us designed be deployed into a Kepnt environment and subscribe 
to the following Keptn Kubernetes channels as defined in [Keptn docs](https://keptn.sh/docs/0.4.0/reference/custom-service)
* new-artifact
* configuration-changed
* deployment-finished
* tests-finished
* evaluation-done
* problem

The service subscribe to each channel and evaluate the cloud event.  If there is a match, then the service will send a notification to either Slack or Microsoft Teams or both depending on how the notification service was configured.

Prerequsites:
* [Keptn 0.4.0](http://www.keptn.sh)
* Slack or Microsoft teams account with permission to add apps/teams/channels
* node v10.15.2 for development only
* Docker for running or building new images locally 

# Setup

## 1. Microsoft Teams

All of these steps are done in Microsoft Teams client.
1. Add a new team
1. In the new team, add a new channel for the Keptn notifications. Save the new channel webhook URL
1. In the new channel, add a new connector of type Webhook
1. Others can join the channel too by first joining the team and adding the new channel

## 2. Slack

A keptn service that forwards events on keptn channels to a Slack channel using a webhook URL. To get your Slack Webhook URL please follow the instructions here: https://api.slack.com/incoming-webhooks

## 3. Keptn notification service

1. Make a copy of the [notification-service.yaml](notification-service.yaml) file and adjust these 
environment variables with the webhook URL.  Leave the value empty if the service is not being used.
```
- name: TEAMS_URL
  value: ""
- name: BRIDGE_URL
  value: ""
```
1. Deploy services into cluster
  * ```kubectl apply -f notification-service.yaml``` using the new service Helm Chart file
  * ```kubectl apply -f notification-distributors.yaml``` using the file in this repo
1. Now run Keptn pipelines and watch for the notifications in your team channel
1. Validate cluster resources ```kubectl -n keptn get pods```.  You should see service and distributor pods

# Send notifications

Use the keptn CLI to start a pipeline using the command [keptn send event new-artifact](https://keptn.sh/docs/0.4.0/reference/cli/#keptn-send-event-new-artifact).   As the pipeline runs,
it will send various cloud events like "new-artifact" and "deployment-finished"

# Local development

## Build and run the application
1. Clone this repo
1. Run ```npm install``` to get all the requires modules
1. Start the service with ```npm run start:dev```.  This will update "on-the-fly" as you make file changes
1. Access the service at ```http://localhost:8080```

## Testing

You can use the PostMan collection JSON file ```keptn-notifications.postman_collection.json``` in this repo to test all the events.

To manually setup a request in a tool like Postman, use the following values.
* URL = ```http://localhost:8080```
* Content-Type = application/cloudevents+json
* Type = POST
* Raw Body for a Keptn deployment event
    ```
    {  
    "specversion":"0.2",
    "type":"sh.keptn.events.new-artifact",
    "id":"1234",
    "time":"2018-04-05T17:31:00Z",
    "contenttype":"application/json",
    "shkeptncontext":"db51be80-4fee-41af-bb53-1b093d2b694c",
    "data":{  
        "githuborg":"keptn-tiger",
        "project":"sockshop",
        "teststrategy":"functional",
        "deploymentstrategy":"direct",
        "stage":"dev",
        "service":"carts",
        "image":"10.11.245.27:5000/sockshopcr/carts",
        "tag":"0.6.7-16"
    }
    }
    ```
You should get a HTTP 200 response code and see the notification in either Slack or Microsoft Teams.

## Build a Docker image and run as a container

1. Run these commands after adjusting the repo, image name, and tag in this example
    ```
    # build image
    docker build -t robjahn/notification-service:0.1.0 .

    # start image. Leave out environment variable for unwanted service
    docker run -p 8080:8080 -e TEAMS_URL="<Your URL>" -e SLACK_URL="your URL" robjahn/notification-service:0.1.0
    ```
1. Access the service at ```http://localhost:8080```

# Reference

## Mircosoft cards
* https://docs.microsoft.com/en-us/outlook/actionable-messages/message-card-reference
* https://www.lee-ford.co.uk/send-message-cards-with-microsoft-teams/
