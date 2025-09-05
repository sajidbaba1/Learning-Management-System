import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, List, Space } from 'antd';

type ContentItem = {
  id: string;
  title: string;
  type: string;
};

type Module = {
  id: string;
  title: string;
  contents: ContentItem[];
};

const CourseContentPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  
  // This would be fetched from the API in a real implementation
  const modules: Module[] = [
    {
      id: '1',
      title: 'Introduction',
      contents: [
        { id: '1', title: 'Welcome Video', type: 'VIDEO' },
        { id: '2', title: 'Syllabus PDF', type: 'DOCUMENT' },
      ],
    },
    {
      id: '2',
      title: 'Week 1',
      contents: [
        { id: '3', title: 'Lecture 1', type: 'VIDEO' },
        { id: '4', title: 'Assignment 1', type: 'ASSIGNMENT' },
      ],
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <h1>Course Content</h1>
        
        <Button type="primary">Add New Module</Button>
        
        <List
          itemLayout="vertical"
          dataSource={modules}
          renderItem={(module) => (
            <Card 
              title={module.title} 
              extra={<Button>Add Content</Button>}
              style={{ marginBottom: '16px' }}
            >
              <List
                dataSource={module.contents}
                renderItem={(content) => (
                  <List.Item>
                    <List.Item.Meta
                      title={content.title}
                      description={content.type}
                    />
                    <Space>
                      <Button>Edit</Button>
                      <Button danger>Delete</Button>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          )}
        />
      </Space>
    </div>
  );
};

export default CourseContentPage;
