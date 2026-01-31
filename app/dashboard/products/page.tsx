import Link from "next/link"
import { ArrowRight, Package } from "lucide-react"

export default function Page() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
          <Package className="h-6 w-6 text-gray-700" />
        </div>

        <h1 className="text-xl font-semibold text-gray-900">
          Products Website
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Products are managed and displayed on the public products website.
          Click below to view and manage products there.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Go to Products Website
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
