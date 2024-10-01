// import * as tf from '@tensorflow/tfjs-node';  // Use tfjs-node for filesystem support
import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as fse from 'fs-extra';  // Use fs-extra for saving files

// Other code remains the same...

// Function to train the neural network model and save it
async function trainModel(model, dataset) {
  const tasks = [];
  const labels = [];

  for (let item of dataset) {
    const embedding = await vectorizeText(item.text);  // Get USE embeddings
    tasks.push(embedding);
    labels.push(LABEL_MAP[item.label]);  // Convert label to binary (1 or 0)
  }

  // Convert tasks and labels into tensors
  const xs = tf.concat(tasks);  // Concatenate embeddings into a single tensor
  const ys = tf.tensor(labels);

  // Train the model
  await model.fit(xs, ys, {
    epochs: 10,
    batchSize: 8,
    shuffle: true,
    validationSplit: 0.2,  // Split the dataset for validation
  });

  // Save the model after training
  const modelPath = 'file://./saved-model';  // Directory to save the model
  await model.save(modelPath);
  console.log(`Model saved at ${modelPath}`);
}

// Function to load the model from the saved file
async function loadSavedModel() {
  const model = await tf.loadLayersModel('file://./saved-model/model.json');
  console.log('Model loaded successfully');
  return model;
}

// Usage example
async function run() {
  await loadModel();  // Load USE model

  const model = createModel();  // Create neural network model

  // Train and save the model
  await trainModel(model, Dataset);

  // Load the saved model
  const savedModel = await loadSavedModel();

  // Classify a task using the saved model
  const result = await classifyTask(savedModel, "Play Game all day");
  console.log(`Task classification: ${result}`);  // Output either "productive" or "non-productive"
}

run();
