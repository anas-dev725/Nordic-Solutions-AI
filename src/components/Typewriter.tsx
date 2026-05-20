/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  phrases: string[];
  currentIndex: number;
}

export function Typewriter({ phrases, currentIndex }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(currentIndex);

  const activePhrase = phrases[phraseIdx] || '';

  useEffect(() => {
    // When the external index changes, start deleting first
    if (currentIndex !== phraseIdx) {
      setIsDeleting(true);
    }
  }, [currentIndex, phraseIdx]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const typeSpeed = isDeleting ? 20 : 45;

    if (isDeleting) {
      // Backspacing
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, typeSpeed);
      } else {
        setIsDeleting(false);
        // Swap to the new phrase index
        setPhraseIdx(currentIndex);
      }
    } else {
      // Typing forward
      if (displayedText.length < activePhrase.length) {
        timer = setTimeout(() => {
          const nextChar = activePhrase[displayedText.length];
          setDisplayedText(prev => prev + nextChar);
        }, typeSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIdx, currentIndex, activePhrase]);

  return (
    <span className="inline-flex items-center italic">
      <span>{displayedText}</span>
      <span className="w-[2px] h-[1.1em] ml-1 bg-current animate-pulse opacity-80" style={{ verticalAlign: 'middle' }} />
    </span>
  );
}
