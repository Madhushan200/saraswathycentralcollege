import { useEffect, useState } from "react";

export default function BlogSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/wp-json/wp/v2/posts?_embed&per_page=3")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Latest Blogs
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => {
            const image =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {image && (
                  <img
                    src={image}
                    alt={post.title.rendered}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-3"
                    dangerouslySetInnerHTML={{
                      __html: post.title.rendered,
                    }}
                  />

                  <p
                    className="text-gray-600 mb-5"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered,
                    }}
                  />

                  <a
                    href={post.link}
                    className="text-blue-600 font-semibold"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}