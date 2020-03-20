import { configure, addDecorator } from "@storybook/react";
// import { addDecorator } from "@storybook/react";
// import { withNotes } from "@storybook/addon-notes";

// Provider is basically the same as what is often included in App.js
import withProvider from "./Provider";

const loadStories = () => {
    const req = require.context("../../../src", true, /.stories.js$/);
    req.keys().forEach(filename => req(filename));
};

addDecorator(withProvider);
// addDecorator(withNotes);
configure(loadStories, module);
