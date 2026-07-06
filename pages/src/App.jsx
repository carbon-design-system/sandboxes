import React, { useMemo } from "react";
import {
  ClickableTile,
  FeatureFlags,
  Grid,
  Column,
  Heading,
  Section,
} from "@carbon/react";
import readme from "../../README.md?raw";

function parseTable(raw) {
  const lines = raw.split("\n");
  const headerIdx = lines.findIndex(
    (l) =>
      l.trim().startsWith("|") &&
      l.includes("Carbon version") &&
      l.includes("React version")
  );
  if (headerIdx === -1) return [];

  // The "divider" is the next line ("| --- | --- | --- | --- |")
  const dividerIdx = headerIdx + 1;
  // Rows start after that, until a blank line or a line that doesn't start with '|'
  const rows = [];
  for (let i = dividerIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith("|") || line === "") break;
    rows.push(line);
  }

  return rows.map((row) => {
    // Split on '|' (first/last columns are empty strings)
    const cols = row.split("|").map((c) => c.trim());
    // cols[1] = Carbon version, cols[2] = React version, cols[3] = Framework, cols[4] = Link
    const carbon = cols[1];
    const reactVer = cols[2];

    // Extract "Framework" label from markdown like "[Vite](https://vitejs.dev/)"
    const frameworkMatch = cols[3].match(/\[([^[]+)\]\(.*?\)/);
    const framework = frameworkMatch ? frameworkMatch[1].trim() : cols[3];

    // Extract the URL from "[![Open in StackBlitz](...)](https://...)"
    const linkMatch = cols[4].match(/\[!\[.*?\]\(.*?\)\]\((.*?)\)/);
    const url = linkMatch ? linkMatch[1].trim() : "";

    return { carbon, reactVer, framework, url };
  });
}

function parseWCTable(raw) {
  const lines = raw.split("\n");
  const headerIdx = lines.findIndex(
    (l) =>
      l.trim().startsWith("|") &&
      l.includes("Carbon version") &&
      !l.includes("React version")
  );
  if (headerIdx === -1) return [];

  const rows = [];
  for (let i = headerIdx + 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith("|") || line === "") break;
    rows.push(line);
  }

  return rows.map((row) => {
    const cols = row.split("|").map((c) => c.trim());
    // cols[1] = Carbon version, cols[2] = Framework, cols[3] = Link
    const carbon = cols[1];
    const frameworkMatch = cols[2].match(/\[([^[]+)\]\(.*?\)/);
    const framework = frameworkMatch ? frameworkMatch[1].trim() : cols[2];
    const linkMatch = cols[3].match(/\[!\[.*?\]\(.*?\)\]\((.*?)\)/);
    const url = linkMatch ? linkMatch[1].trim() : "";
    return { carbon, framework, url };
  });
}

export default function App() {
  const sandboxes = useMemo(() => parseTable(readme), []);
  const wcSandboxes = useMemo(() => parseWCTable(readme), []);

  return (
    <FeatureFlags
      flags={{
        enableExperimentalTileContrast: true,
      }}
    >
      <Grid>
        <Column
          sm={4}
          md={8}
          lg={16}
          style={{
            marginBottom: "calc(var(--cds-grid-gutter-start) * 2)",
            marginTop: "calc(var(--cds-grid-gutter-start) * 2)",
          }}
        >
          <Heading>Carbon Design System Sandboxes</Heading>
        </Column>
      </Grid>
      <Section>
        <Grid>
          <Column
            sm={4}
            md={8}
            lg={16}
            style={{ marginBottom: "calc(var(--cds-grid-gutter-start) * 2)" }}
          >
            <Heading>React</Heading>
          </Column>
          {sandboxes.map(({ carbon, reactVer, framework, url }) => (
            <Column
              sm={4}
              md={4}
              lg={4}
              style={{ marginBottom: "calc(var(--cds-grid-gutter-start) * 2)" }}
            >
              <ClickableTile
                key={`${carbon}-${reactVer}-${framework}`}
                href={url}
                target="_blank"
                rel="noopener"
                className="sandbox-tile"
              >
                <Section>
                  <p>
                    <pre>@carbon/react@{carbon}</pre>
                    <pre>react@{reactVer}</pre>
                    <pre>{framework}</pre>
                  </p>
                  <img
                    alt="Open in StackBlitz"
                    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
                    style={{
                      marginTop: "calc(var(--cds-grid-gutter-start) * 2)",
                    }}
                  />
                </Section>
              </ClickableTile>
            </Column>
          ))}
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Column
            sm={4}
            md={8}
            lg={16}
            style={{ marginBottom: "calc(var(--cds-grid-gutter-start) * 2)" }}
          >
            <Heading>Web Components</Heading>
          </Column>
          {wcSandboxes.map(({ carbon, framework, url }) => (
            <Column
              key={`${carbon}-${framework}`}
              sm={4}
              md={4}
              lg={4}
              style={{ marginBottom: "calc(var(--cds-grid-gutter-start) * 2)" }}
            >
              <ClickableTile
                href={url}
                target="_blank"
                rel="noopener"
                className="sandbox-tile"
              >
                <Section>
                  <p>
                    <pre>@carbon/web-components@{carbon}</pre>
                    <pre>{framework}</pre>
                  </p>
                  <img
                    alt="Open in StackBlitz"
                    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
                    style={{
                      marginTop: "calc(var(--cds-grid-gutter-start) * 2)",
                    }}
                  />
                </Section>
              </ClickableTile>
            </Column>
          ))}
        </Grid>
      </Section>
    </FeatureFlags>
  );
}
