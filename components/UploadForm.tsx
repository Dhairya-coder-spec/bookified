'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageSquare, Trash, UploadSimple } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import LoadingOverlay from "@/components/LoadingOverlay";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    ACCEPTED_IMAGE_TYPES,
    DEFAULT_VOICE,
    MAX_FILE_SIZE,
    MAX_IMAGE_SIZE,
    voiceCategories,
    voiceOptions,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const voiceIds = ["dave", "daniel", "chris", "rachel", "sarah"] as const;

const uploadFormSchema = z.object({
    pdf: z.file({ error: "Choose a PDF file." })
        .max(MAX_FILE_SIZE, "The PDF must be 50MB or smaller.")
        .mime("application/pdf", "Choose a PDF file."),
    cover: z.file()
        .max(MAX_IMAGE_SIZE, "The cover image must be 10MB or smaller.")
        .mime(ACCEPTED_IMAGE_TYPES, "Choose a JPG, PNG, or WebP image.")
        .optional(),
    title: z.string().trim().min(1, "Enter the book title."),
    author: z.string().trim().min(1, "Enter the author's name."),
    voice: z.enum(voiceIds),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);
    const form = useForm<UploadFormValues>({
        resolver: zodResolver(uploadFormSchema),
        defaultValues: {
            title: "",
            author: "",
            voice: DEFAULT_VOICE,
        },
    });

    const onSubmit = async () => {
        setSubmitError(null);
        setIsSubmitting(true);

        await new Promise<void>((resolve) => {
            window.requestAnimationFrame(() => resolve());
        });

        setIsSubmitting(false);
        setSubmitError("Book uploads aren't connected to a service yet. Your files have not been uploaded.");
    };

    return (
        <div className="new-book-wrapper">
            <Form {...form}>
                <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                    <FormField
                        control={form.control}
                        name="pdf"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="book-pdf-file">Book PDF File</FormLabel>
                                <div className="space-y-3">
                                    <FormControl>
                                        <input
                                            type="file"
                                            accept="application/pdf,.pdf"
                                            className="peer sr-only"
                                            onChange={(event) => field.onChange(event.target.files?.[0])}
                                            ref={(element) => {
                                                field.ref(element);
                                                pdfInputRef.current = element;
                                            }}
                                            id="book-pdf-file"
                                        />
                                    </FormControl>
                                    <label
                                        htmlFor="book-pdf-file"
                                        className={cn("upload-dropzone peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-brand)]/20", field.value && "upload-dropzone-uploaded")}
                                    >
                                        <UploadSimple className="upload-dropzone-icon" aria-hidden="true" />
                                        <span className="upload-dropzone-text max-w-full truncate px-4">
                                            {field.value?.name ?? "Click to upload PDF"}
                                        </span>
                                        <span className="upload-dropzone-hint">
                                            {field.value ? "Click to choose a different PDF" : "PDF file (max 50MB)"}
                                        </span>
                                    </label>
                                    {field.value && (
                                        <button
                                            type="button"
                                            className="upload-dropzone-remove gap-2"
                                            onClick={() => {
                                                field.onChange(undefined);
                                                if (pdfInputRef.current) pdfInputRef.current.value = "";
                                                form.clearErrors("pdf");
                                            }}
                                        >
                                            <Trash size={18} aria-hidden="true" />
                                            Remove PDF
                                        </button>
                                    )}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cover"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="book-cover-file">Cover Image (Optional)</FormLabel>
                                <div className="space-y-3">
                                    <FormControl>
                                        <input
                                            type="file"
                                            accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                            className="peer sr-only"
                                            onChange={(event) => field.onChange(event.target.files?.[0])}
                                            ref={(element) => {
                                                field.ref(element);
                                                coverInputRef.current = element;
                                            }}
                                            id="book-cover-file"
                                        />
                                    </FormControl>
                                    <label
                                        htmlFor="book-cover-file"
                                        className={cn("upload-dropzone peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-brand)]/20", field.value && "upload-dropzone-uploaded")}
                                    >
                                        <ImageSquare className="upload-dropzone-icon" aria-hidden="true" />
                                        <span className="upload-dropzone-text max-w-full truncate px-4">
                                            {field.value?.name ?? "Click to upload cover image"}
                                        </span>
                                        <span className="upload-dropzone-hint">
                                            {field.value ? "Click to choose a different image" : "Leave empty to auto-generate from PDF"}
                                        </span>
                                    </label>
                                    {field.value && (
                                        <button
                                            type="button"
                                            className="upload-dropzone-remove gap-2"
                                            onClick={() => {
                                                field.onChange(undefined);
                                                if (coverInputRef.current) coverInputRef.current.value = "";
                                                form.clearErrors("cover");
                                            }}
                                        >
                                            <Trash size={18} aria-hidden="true" />
                                            Remove cover
                                        </button>
                                    )}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="text"
                                        className="form-input"
                                        placeholder="ex: Rich Dad Poor Dad"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author Name</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        type="text"
                                        className="form-input"
                                        placeholder="ex: Robert Kiyosaki"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="voice"
                        render={({ field }) => (
                            <FormItem>
                                <fieldset className="space-y-4">
                                    <legend className="form-label">Choose Assistant Voice</legend>
                                    <div className="space-y-5">
                                        {Object.entries(voiceCategories).map(([category, ids]) => (
                                            <div className="space-y-2" key={category}>
                                                <h3 className="text-sm font-medium text-[var(--text-secondary)]">
                                                    {category === "male" ? "Male Voices" : "Female Voices"}
                                                </h3>
                                                <div className={cn("voice-selector-options", category === "female" && "voice-selector-options-two")}>
                                                    {ids.map((id) => {
                                                        const voice = voiceOptions[id];
                                                        const selected = field.value === id;

                                                        return (
                                                            <FormItem
                                                                className={cn(
                                                                    "voice-selector-option space-y-0",
                                                                    selected
                                                                        ? "voice-selector-option-selected"
                                                                        : "voice-selector-option-default",
                                                                )}
                                                                key={id}
                                                            >
                                                                <FormControl>
                                                                    <input
                                                                        type="radio"
                                                                        value={id}
                                                                        checked={selected}
                                                                        onChange={() => field.onChange(id)}
                                                                        name={field.name}
                                                                        ref={field.ref}
                                                                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#663820]"
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="mb-0 flex-1 cursor-pointer text-sm text-[var(--text-primary)]">
                                                                    <span className="block font-semibold">{voice.name}</span>
                                                                    <span className="mt-1 block text-xs font-normal leading-4 text-[var(--text-secondary)]">
                                                                        {voice.description}
                                                                    </span>
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {submitError && (
                        <p className="text-sm font-medium text-red-700" role="alert">
                            {submitError}
                        </p>
                    )}

                    <button className="form-btn" type="submit" disabled={isSubmitting}>
                        Begin Synthesis
                    </button>
                </form>
            </Form>
            {isSubmitting && <LoadingOverlay />}
        </div>
    )
}

export default UploadForm