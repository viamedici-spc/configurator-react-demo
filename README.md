<div>
  <strong>Viamedici SPC</strong>
</div>

# Demo Configurator with React

[![npm version](https://img.shields.io/badge/Live-Demo-green)](https://viamedici-spc.github.io/configurator-react-demo/)
[![GitHub License](https://img.shields.io/github/license/viamedici-spc/configurator-react-demo)](https://github.com/viamedici-spc/configurator-react-demo/blob/main/LICENSE)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/viamedici-spc/configurator-react-demo/deploy.yml?branch=main)](https://github.com/viamedici-spc/configurator-react-demo/actions/workflows/deploy.yml?query=branch%3Amain)

## Introduction

This project is a demo application designed to showcase the integration of our npm package,
**@viamedici-spc/configurator-react**, with **React**.

It aims to help web developers quickly grasp how to embed and utilize **configurator-react** in an SPA,
covering everything from initialization to user interaction and typical patterns used in configurator applications.

The app is technically designed to emphasize the features provided by our configuration solution.

## Live Demo

https://viamedici-spc.github.io/configurator-react-demo/

The app utilizes a small _Configuration Model_ based on a simple car. It includes several _Rules_ that allow you to
explore features like _Implicit Decisions_, _Blocked Values_, and _Explain_ for different type of _Attributes_.

You can follow the workflow below to see these features in action:

1. **Select `EU` in `Sales Region`:** Your _Explicit Decision_ automatically triggers an _Implicit Decision_, where
   `Construction` is set to `Implicit: Car`. Since no further _Explicit Decision_ is required, `Construction` becomes
   _satisfied_.

2. **Select `Manual` in `Transmission::Type`:** Your _Explicit Decision_ again triggers an _Implicit Decision_, setting
   `Transmission` to `Implicit: included`.

3. **Select `yes` in `HeavyDuty`:** This action triggers the _Explain_ feature, revealing which previous selection is
   blocking `yes`.

4. **In the prompt type `1` and confirm:** This applies the first solution. The configuration system removes some of
   your incompatible
   _Explicit Decisions_ and applies additional _Implicit Decisions_.

5. **Click the _Explain_ button in the Configuration (top left):** The configuration system indicates that a _Decision_
   for `HorsePower` is required to complete the configuration.

6. **Type `300` in `HorsePower`:** The configuration is now `satisfied`, meaning you have completed the configuration.
   No _Decision_ for `Accessories` is needed as it is marked _optional_ and has been _satisfied_ from the start.

## Run Locally

To run the demo application locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/viamedici-spc/configurator-react-demo
    ```

2. **Navigate to the project directory:**
    ```bash
    cd configurator-react-demo
    ```

3. **Install dependencies:**
   ```bash
   npm install
   yarn install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   yarn run dev
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.