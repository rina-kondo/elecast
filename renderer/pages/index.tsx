import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => {
  return (
    <Layout title="">
      <h1>ELECAST</h1>
      <p>
        <Link href="/about">About</Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
