const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const cors = require("cors")({origin: true});

// Initialize Firebase Admin SDK
initializeApp();

/**
 * Webhook to receive GitHub events, parse them, and store them in Firestore.
 */
exports.githubWebhook = onRequest(async (req, res) => {
  // Use CORS to allow requests from any origin (for testing)
  cors(req, res, async () => {
    // We only want to handle POST requests
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const event = req.body;
    let processedEvent = null;

    try {
      // Determine the event type and process the payload
      if (event.starred_at) { // Star Event
        processedEvent = {
          type: "star",
          repo: event.repository.name,
          actor: event.sender.login,
          timestamp: new Date(event.starred_at),
        };
      } else if (event.issue) { // Issue Event
        processedEvent = {
          type: "issue",
          repo: event.repository.name,
          actor: event.sender.login,
          timestamp: new Date(),
          details: `New Issue: "${event.issue.title}"`,
        };
      } else if (event.commits) { // Push Event
        processedEvent = {
          type: "push",
          repo: event.repository.name,
          actor: event.commits[0].author.name,
          timestamp: new Date(event.commits[0].timestamp),
          details: `${event.commits.length} new commit(s) pushed to main`,
        };
      }

      if (processedEvent) {
        // Save the processed event to our 'events' collection in Firestore
        const db = getFirestore();
        await db.collection("events").add(processedEvent);
        console.log("Successfully stored event:", processedEvent);
        res.status(200).send({
          message: "Event received and stored.",
          data: processedEvent,
        });
      } else {
        console.warn("Received an unhandled event type.");
        res.status(400).send("Unhandled event type.");
      }
    } catch (error) {
      console.error("Error processing webhook:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});
