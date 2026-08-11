#!/usr/bin/env python3
"""Identify thin documentation pages that need expansion"""
import os

docs_dir = "/workspace/src/app/docs"

thin_docs = []
for root, dirs, files in os.walk(docs_dir):
    for file in files:
        if file == "page.tsx":
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Count words (excluding code)
            word_count = len(content.split())
            
            if word_count < 500:
                doc_name = os.path.basename(root)
                thin_docs.append((doc_name, filepath, word_count))

print("Thin documentation pages (< 500 words):")
print("=" * 60)
for doc_name, filepath, count in sorted(thin_docs, key=lambda x: x[2]):
    print(f"{doc_name}: {count} words")
    print(f"  Path: {filepath}")
    print()

print(f"\nTotal thin docs: {len(thin_docs)}")
