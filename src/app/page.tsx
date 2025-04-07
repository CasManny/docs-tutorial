import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <p>
        <Link href={'/documents/1234'}>click here</Link>to go to document page
      </p>
    </div>
  );
}
