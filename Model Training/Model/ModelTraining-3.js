import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import { Dataset } from "./Dataset.js";

let useModel;

const LABEL_MAP = {
  "Productive": 1,
  "Non-Productive": 0,
};

function preprocess(text) {
  return text.toLowerCase();
}
async function saveModel(model) {
  console.log(model);
}

async function loadModel() {
  useModel = await use.load();
  console.log("USE Model loaded");
}

async function vectorizeText(text) {
  const embeddings = await useModel.embed([preprocess(text)]);
  return embeddings;
}

function createModel() {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({ units: 128, inputShape: [512], activation: "relu" })
  );
  model.add(tf.layers.dense({ units: 64, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

  model.compile({
    optimizer: "adam",
    loss: "binaryCrossentropy",
    metrics: ["accuracy"],
  });

  return model;
}

async function trainModel(model, dataset) {
  const tasks = [];
  const labels = [];

  for (let item of dataset) {
    const embedding = await vectorizeText(item.text);
    tasks.push(embedding);
    labels.push(LABEL_MAP[item.label]);
  }

  const xs = tf.concat(tasks);
  const ys = tf.tensor(labels);

  await model.fit(xs, ys, {
    epochs: 10,
    batchSize: 8,
    shuffle: true,
    validationSplit: 0.2,
  });
}

async function classifyTask(model, task) {
  const embedding = await vectorizeText(task);
  const prediction = model.predict(embedding);
  const result = (await prediction.data())[0];
  return result > 0.5 ? "Productive" : "Non-Productive";
}

async function run() {
  await loadModel();

  const model = createModel();

  await trainModel(model, Dataset);

  await saveModel(model);

  const result = await classifyTask(model, "Read Data Structure Algoritum Book");
  console.log(`Task classification: ${result}`);
}

run();
