export default function Card({ title, content }) {
    return (
      <div className="border p-4 rounded-lg shadow-sm bg-white">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-gray-700 mt-1">{content}</p>
      </div>
    )
  }
  