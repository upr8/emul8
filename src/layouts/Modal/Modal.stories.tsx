import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';

const meta = {
  title: 'Layouts/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalDemo = ({ size }: { size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Open Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Content size={size}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
            <Modal.Description>This is a description of the modal.</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <p>
              This is the modal body content. You can put any content here, including forms, lists,
              or other components.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirm
            </button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const SmallSize: Story = {
  render: () => <ModalDemo size="sm" />,
};

export const LargeSize: Story = {
  render: () => <ModalDemo size="lg" />,
};

export const ExtraLargeSize: Story = {
  render: () => <ModalDemo size="xl" />,
};

export const FullSize: Story = {
  render: () => <ModalDemo size="full" />,
};

const ScrollableDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Open Scrollable Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Content size="md">
          <Modal.Header>
            <Modal.Title>Scrollable Content</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="mb-4">
                Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export const ScrollableContent: Story = {
  render: () => <ScrollableDemo />,
};

const NoBackdropCloseDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Open Modal (No Backdrop Close)
      </button>
      <Modal open={open} onClose={() => setOpen(false)} closeOnBackdropClick={false}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Click backdrop to test</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Clicking the backdrop will NOT close this modal. Use the button below.</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export const NoBackdropClose: Story = {
  render: () => <NoBackdropCloseDemo />,
};

const SimpleContentDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Open Simple Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Content>
          <Modal.Body>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Simple Modal</h3>
              <p className="text-gray-500 mb-4">No header or footer, just content.</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Got it
              </button>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export const SimpleContent: Story = {
  render: () => <SimpleContentDemo />,
};
