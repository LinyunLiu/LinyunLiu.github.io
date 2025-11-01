pandoc /Users/linyunliu/Documents/Obsidian\ Vault/Test.md \
  --template=templates/_default.html \
  --standalone \
  --from markdown-auto_identifiers \
  --to html \
  --strip-comments \
  --syntax-highlighting=none \
  --wrap=none \
  -o /Users/linyunliu/Documents/Portfolio/docs/blogs/convert-an-image-into-colourful-ascii-art/index.html

# --template=template.html	         Use your custom HTML wrapper
# --standalone	                     Produce full HTML document
# --from markdown-auto_identifiers	 Prevent Pandoc from adding auto IDs to headings
# --strip-comments	                 Remove Markdown comments
# --syntax-highlighting=none	       Avoid code syntax wrappers
# --wrap=none	                       Prevent wrapping text in extra tags
