"use client";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.actions";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Thumbnail from "../Thumbnail";
import { Button } from "../ui/button";

interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}
const FileUploader = ({
  ownerId,
  accountId,
  className = "",
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const path = usePathname();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((cur) => cur.filter((f) => f.name !== file.name));

          return toast({
            description: (
              <p className="body-2 text-2">
                <span className="font-semibold">{file.name}</span> is too large.
                Max file size is 50MB.
              </p>
            ),
            className: "error-toast",
          });
        }

        return uploadFile({ accountId, file, ownerId, path }).then(
          (uploadFile) => {
            if (uploadFile) {
              setFiles((cur) => cur.filter((f) => f.name !== file.name));
            }
          },
        );
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string,
  ) => {
    e.stopPropagation();
    setFiles((cur) => cur.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />

      <Button type="button" className={cn("uploader-button", className)}>
        <Image src="icons/upload.svg" alt="upload" height={24} width={24} />
        <p>Upload</p>
      </Button>

      {files.length > 0 && (
        <ul className="uploader-preview-list">
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />
                  <div className="preview-item-name space-y-1">
                    <span className="block w-[calc(100%)] truncate">
                      {file.name}
                    </span>
                    <Image
                      src="/icons/file-loader.gif"
                      width={80}
                      height={26}
                      alt="Loader"
                      unoptimized
                    />
                  </div>
                </div>

                <Image
                  src="/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="Remove"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
