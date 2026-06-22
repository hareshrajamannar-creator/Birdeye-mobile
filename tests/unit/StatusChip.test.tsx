import React from 'react';
import { render } from '@testing-library/react-native';
import StatusChip from '../../src/components/StatusChip/StatusChip';

describe('StatusChip', () => {
  it('renders "Post expired" chip', () => {
    const { getByText } = render(<StatusChip status="post_expired" />);
    expect(getByText('Post expired')).toBeTruthy();
  });

  it('renders "Pending approval" chip', () => {
    const { getByText } = render(<StatusChip status="pending_approval" />);
    expect(getByText('Pending approval')).toBeTruthy();
  });

  it('renders "Rejected" chip', () => {
    const { getByText } = render(<StatusChip status="rejected" />);
    expect(getByText('Rejected')).toBeTruthy();
  });

  it('renders nothing for published status', () => {
    const { toJSON } = render(<StatusChip status="published" />);
    expect(toJSON()).toBeNull();
  });

  it('renders nothing for scheduled status', () => {
    const { toJSON } = render(<StatusChip status="scheduled" />);
    expect(toJSON()).toBeNull();
  });
});
