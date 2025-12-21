import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Product not found</h1>
      <p className="text-lg mb-6">
        The product you are looking for does not exist.
      </p>
      <Link href="/" className="text-blue-500">
        Go back to the home page
      </Link>
    </main>
  );
}
