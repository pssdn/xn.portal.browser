import { h } from "hyperapp"; // eslint-disable-line

import "./jumbotron.css";

export const Jumbotron = () => state => (
  <div class="jumbotron">
    <div class="container">
      <h1 class="display-3">{state.clientName}, bem-vindo ao Beon!</h1>
      <p>
        This is a template for a simple marketing or informational website. It
        includes a large callout called a jumbotron and three supporting pieces
        of content. Use it as a starting point to create something more unique.
      </p>
    </div>
  </div>
);
