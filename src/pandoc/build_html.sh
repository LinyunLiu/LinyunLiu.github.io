# Input and output base directories
input_dir="../../contents/blogs"
output_base="../../docs/blogs"

# Loop over all Markdown files in input_dir
for input in "$input_dir"/*.md; do
    # 1. Get base name without path or extension
    basename=$(basename "$input" .md)

    # 2. Slugify it: lowercase + replace spaces with hyphens
    slug=$(echo "$basename" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')

    # 3. Create output directory for this file
    output_dir="$output_base/$slug"
    mkdir -p "$output_dir"

    # 4. Convert Markdown to HTML with Pandoc
    pandoc "$input" \
      --template=templates/_default.html \
      --standalone \
      --from markdown-auto_identifiers \
      --to html \
      --strip-comments \
      --syntax-highlighting=none \
      --wrap=none \
      -o "$output_dir/index.html"

    echo "Converted: $input → $output_dir/index.html"
done


# --template=template.html	         Use your custom HTML wrapper
# --standalone	                     Produce full HTML document
# --from markdown-auto_identifiers	 Prevent Pandoc from adding auto IDs to headings
# --strip-comments	                 Remove Markdown comments
# --syntax-highlighting=none	       Avoid code syntax wrappers
# --wrap=none	                       Prevent wrapping text in extra tags
