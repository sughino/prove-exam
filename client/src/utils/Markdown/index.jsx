import readme from '../../docs/README.md';
import React, { useState, useEffect, useContext, forwardRef } from 'react';
import { ThemeContext } from 'styled-components';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import Link from '@mui/material/Link';
import { Text } from '../Text';
import './markdown.css';

export const ReadmeComponent = forwardRef((props, ref) => {
  const [content, setContent] = useState('');
  const theme = useContext(ThemeContext);

  useEffect(() => {
    fetch(readme)
      .then(res => res.text())
      .then(text => {
        setContent(text);
      })
      .catch(err => {
        console.error('Errore nel caricamento del README:', err);
      });
  }, []);

  const MarkdownComponents = {
    h1: ({ node, ...props }) => (
      <Text variant={'h1'} {...props}></Text>
    ),
    h2: ({ node, ...props }) => (
      <Text variant={'h2'} {...props}></Text>
    ),
    h3: ({ node, ...props }) => (
      <Text variant={'h3'} {...props}></Text>
    ),
    h4: ({ node, ...props }) => (
      <Text variant={'h4'} {...props}></Text>
    ),
    h5: ({ node, ...props }) => (
      <Text variant={'h5'} {...props}></Text>
    ),
    h6: ({ node, ...props }) => (
      <Text variant={'h6'} {...props}></Text>
    ),

    p: ({ node, ...props }) => (
      <Text variant={'body'} {...props}></Text>
    ),

    a: ({ node, ...props }) => (
      <Link href="#" color={theme.colors.primary} {...props} />
    ),
  };

  return (
    <div className="markdown-container" ref={ref}>
      <div className="markdown-content">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={MarkdownComponents}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
});