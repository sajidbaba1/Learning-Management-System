import React from 'react';
import { Card, Progress, List, Typography } from 'antd';

const { Title, Text } = Typography;

const ProgressPage = () => {
  // This would come from API/Redux in a real implementation
  const courses = [
    {
      id: '1',
      title: 'Introduction to Programming',
      progress: 75,
      completedItems: 3,
      totalItems: 4,
    },
    {
      id: '2',
      title: 'Advanced Algorithms',
      progress: 30,
      completedItems: 2,
      totalItems: 7,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>My Progress</Title>
      
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={courses}
        renderItem={(course) => (
          <List.Item>
            <Card title={course.title}>
              <div style={{ marginBottom: '16px' }}>
                <Progress percent={course.progress} status="active" />
                <Text>
                  {course.completedItems} of {course.totalItems} items completed
                </Text>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProgressPage;
