---
to: <%= absPath %>/index.tsx
---
import PageContent from '@components/organisms/pageContent';

const <%= name %>Page = () => {
  return (
    <PageContent title="<%= name %>" data-testid="test-page-<%= fileName %>">
      <div className="flex justify-center items-center"></div>
    </PageContent>
  );
}

export default <%= name %>Page;