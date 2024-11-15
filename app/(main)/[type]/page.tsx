import FileCard from "@/components/FileCard";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Loader2 } from "lucide-react";
import { Models } from "node-appwrite";
import React, { Suspense } from "react";

const FilesList = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";

  if (!["documents", "images", "media", "others"].includes(type)) {
    return (
      <div className="grid h-full place-content-center">
        <h1 className="h3 md:h2 lg:h1 uppercase tracking-widest text-gray-600">
          404 | Not Found
        </h1>
      </div>
    );
  }

  const files = await getFiles();

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">0 MB</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <FileCard key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <div className="grid h-full place-items-center">
          <p className="empty-list">No files uploaded</p>
        </div>
      )}
    </div>
  );
};

export default function PageWrapper(props: SearchParamProps) {
  return (
    <Suspense fallback={<LoadingUI />}>
      <FilesList {...props} />
    </Suspense>
  );
}

// Loading Indicator Component
function LoadingUI() {
  //TODO: skeleton loading
  return (
    <div className="grid h-full place-content-center">
      <Loader2 className="h-20 w-20 animate-spin text-brand" />
    </div>
  );
}
