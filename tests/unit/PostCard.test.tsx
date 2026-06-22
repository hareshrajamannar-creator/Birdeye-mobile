import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PostCard from '../../src/components/PostCard/PostCard';
import type { Post } from '../../src/types';

const MOCK_POST: Post = {
  id: 'test-1',
  platform: 'facebook',
  status: 'published',
  scheduledAt: '2024-10-13T10:28:00Z',
  publishedAt: '2024-10-13T10:28:00Z',
  content: 'This is a test post for unit testing.',
  mediaUrl: 'https://picsum.photos/seed/test/140/140',
  mediaCount: 3,
};

describe('PostCard', () => {
  it('renders post content', () => {
    const { getByText } = render(<PostCard post={MOCK_POST} />);
    expect(getByText('This is a test post for unit testing.')).toBeTruthy();
  });

  it('calls onPress with the post when tapped', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<PostCard post={MOCK_POST} onPress={onPress} />);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledWith(MOCK_POST);
  });

  it('shows media count badge when mediaCount > 1', () => {
    const { getByText } = render(<PostCard post={MOCK_POST} />);
    expect(getByText('1/3')).toBeTruthy();
  });

  it('does not show status chip for published status', () => {
    const { queryByText } = render(<PostCard post={MOCK_POST} />);
    expect(queryByText('Post expired')).toBeNull();
    expect(queryByText('Pending approval')).toBeNull();
    expect(queryByText('Rejected')).toBeNull();
  });
});
