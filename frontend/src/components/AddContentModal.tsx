import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface AddContentModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (content: { title: string; description: string; file?: File }) => void;
}

const AddContentModal: React.FC<AddContentModalProps> = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  const beforeUpload = (file: File) => {
    setFile(file);
    return false; // Prevent automatic upload
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSave({ ...values, file });
      form.resetFields();
      setFile(null);
    });
  };

  return (
    <Modal
      title="Add New Content"
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="File" extra="Upload course material (video, document, etc.)">
          <Upload beforeUpload={beforeUpload} fileList={file ? [file] : []}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddContentModal;
