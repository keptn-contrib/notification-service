# Keptn Notification Service

Read an overview of this service in action on MS teams in this blog:
[Keptn now talks MS Teams: How we expand Keptn’s footprint in the Microsoft world](https://medium.com/keptn/keptn-now-talks-ms-teams-how-we-expand-keptns-footprint-in-the-microsoft-world-c330c0c8d4f1)

Watch this short [YouTube video](https://youtu.be/T-qTVht4yI8) that demonstrates this setup and the Keptn notifications in action.

This notification service us designed be deployed into a Kepnt environment and subscribe 
to the following Keptn Kubernetes channels as defined in [Keptn docs](https://github.com/keptn/keptn/blob/release-0.5.0/specification/cloudevents.md)

* sh.keptn.event.configuration.change
* sh.keptn.events.deployment-finished
* sh.keptn.events.tests-finished  
* sh.keptn.events.evaluation-done
* sh.keptn.events.problem

The service subscribe to each channel and evaluate the cloud event.  If there is a match, then the service will send a notification to either Slack or Microsoft Teams or both depending on how the notification service was configured.

_**NOTE: will not send test-finished notification if teststrategy attribute is empty**_

# Prerequsites:
* Have cluster with [Keptn 0.5.0](http://www.keptn.sh) installed
* Slack or Microsoft teams account with permission to add apps/teams/channels
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

Use the keptn CLI to start a pipeline using the command [keptn send event new-artifact](https://keptn.sh/docs/0.5.0/reference/cli/#keptn-send-event-new-artifact).   As the pipeline runs,
it will send various cloud events like "configuration change" and "deployment finished"

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
        "type": "sh.keptn.event.configuration.change",
        "specversion": "0.2",
        "source": "https://github.com/keptn/keptn/cli",
        "id": "49ac0dec-a83b-4bc1-9dc0-1f050c7e781b",
        "time": "2019-06-07T07:02:15.64489Z",
        "contenttype": "application/json",
        "shkeptncontext":"49ac0dec-a83b-4bc1-9dc0-1f050c7e789b",
        "data": {
            "project": "sockshop",
            "stage": "staging",
            "service": "carts",
            "valuesCanary": {
            "image": "docker.io/keptnexamples/carts:0.9.1"
            }
        }
    }
    ```
You should get a HTTP 200 response code and see the notification in either Slack or Microsoft Teams.

## Build a Docker image and run as a container

1. Run these commands after adjusting the repo, image name, and tag in this example
    ```
    # build image
    docker build -t keptnexamples/notification-service:0.2.0 .

    # start image. Leave out environment variable for unwanted service
    docker run -p 8080:8080 -e TEAMS_URL="<Your URL>" -e SLACK_URL="your URL" keptnexamples/notification-service:0.2.0

    # push image
    docker login
    docker push keptnexamples/notification-service:0.2.0
    ```
1. Access the service at ```http://localhost:8080```

# Reference

## Mircosoft cards
* https://docs.microsoft.com/en-us/outlook/actionable-messages/message-card-reference
* https://www.lee-ford.co.uk/send-message-cards-with-microsoft-teams/
