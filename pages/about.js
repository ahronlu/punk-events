import Head from "next/head";

import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout title="About Punk Events">
      <h1>About</h1>
      <p>This is an app to find punk events</p>
      <p>Version: 1.0.0</p>
    </Layout>
  );
}
