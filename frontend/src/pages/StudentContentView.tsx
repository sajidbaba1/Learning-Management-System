import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, List, Space, Typography } from 'antd';

const { Title } = Typography;

type ContentItem = {
  id: string;
  title: string;
  type: string;
  description?: string;
};

const StudentContentView = () => {
  const { courseId } = useParams<{ courseId: string }>();
  
  // This would be fetched from API in a real implementation
  const contents: ContentItem[] = [
    { id: '1', title: 'Introduction Video', type: 'VIDEO', description: 'Welcome to the course' },
    { id: '2', title: 'Lecture 1 Slides', type: 'DOCUMENT', description: 'Week 1 lecture slides' },
    { id: '3', title: 'Assignment 1', type: 'ASSIGNMENT', description: 'Due next week' },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Course Materials</Title>
        
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={contents}
          renderItem={(content) => (
            <List.Item>
              <Card 
                title={content.title} 
                hoverable
                onClick={() => console.log('View content', content.id)}
              >
                <p><strong>Type:</strong> {content.type}</p>
                {content.description && <p>{content.description}</p>}
                <Space style={{ marginTop: '16px' }}>
                  <Button type="primary">View</Button>
                  <Button>Mark as Complete</Button>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      </Space>
    </div>
  );
};

export default StudentContentView;
