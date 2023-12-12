#
# <div align="center">
# 
# System Design Capstone Engineering Report and Analysis by Blaise Pascual
# 
# </div>
#


# I. Introduction

## Purpose of the Report
This report documents the process of rewriting a React, Express, Node application to utilize Next.js with Server-Side Rendering (SSR). The primary focus is to analyze the impact of SSR on page speed, a critical metric for user experience and SEO performance.

## Overview of the Rewriting Process
The initial application architecture was built on a traditional React, Express, and Node stack, which, while robust, presented limitations in terms of page load efficiency and SEO optimization. The decision to transition to Next.js with SSR was driven by the need to enhance these aspects. SSR promises faster page loads by rendering content on the server side and improved SEO through better indexing of content by search engines. However, this rewrite was not without its challenges, including navigating a complex existing state and context code written by another full-stack engineer, and rearchitecting this within the constraints and features of Next.js.

# II. System Design and Environment

## Architecture Overview
The original system was built on a stack comprising vanilla React for the frontend, Express.js as the server framework, and Node.js as the runtime environment. This stack was transitioned to Next.js with SSR, which inherently provides a more streamlined approach for rendering React applications. This move aimed to leverage Next.js’s capabilities for improved performance and SEO.

## Development Environment
The development and testing were conducted on my local PC, equipped with a 13th Gen Intel(R) Core(TM) i7-13700KF processor running at 3.40 GHz, 64.0 GB of installed RAM, and an RTX 4090 graphics card. The software environment consisted of Next.js version [14.x], Node.js version [18.x], and other relevant tooling. Specific configurations for Next.js, including custom server setup and API routes, were tailored to replicate the functionality of the original Express.js server setup.

# III. Implementation and Testing

## Rewriting Process
The rewriting process to Next.js was meticulous, involving the deconstruction of the original React components and their integration into the Next.js pages and API routes. State management and context, initially implemented by a team member, required careful refactoring to align with Next.js’s SSR model. The largest undertaking was the home page, which is now fully functional with SSR. Remaining routes are under development, ensuring a phased but thorough transition.

## Testing Setup
Page speed and performance metrics were assessed using Google's PageSpeed Insights tool. Three variations of the application were tested:
### 1. The original setup using Node runtime without Three.js on Render.
### 2. A version with Bun runtime and Three.js on Vercel.
### 3. A version using Bun runtime without Three.js on Vercel.

These reports (see './reports') provided a quantitative basis for comparing the performance impact of SSR and the Next.js framework. The rewrite's motivation, sparked by the need to explore SSR capabilities and integrate a complex Three.js component successfully on Vercel, highlights the adaptability of Next.js to diverse project requirements and its efficiency over traditional React setups.


# IV. Test results
See following Jupyter Notebook results using Python's Pandas and Matplotlib 



```python
# Install libraries
!pip install pandas matplotlib
```

    Requirement already satisfied: pandas in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (2.0.3)
    Requirement already satisfied: matplotlib in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (3.7.2)
    Requirement already satisfied: python-dateutil>=2.8.2 in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (from pandas) (2.8.2)
    Requirement already satisfied: pytz>=2020.1 in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (from pandas) (2023.3.post1)
    Requirement already satisfied: tzdata>=2022.1 in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (from pandas) (2023.3)
    Requirement already satisfied: numpy>=1.21.0 in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (from pandas) (1.24.3)
    Requirement already satisfied: contourpy>=1.0.1 in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (from matplotlib) (1.0.5)
    Requirement already satisfied: cycler>=0.10 in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (from matplotlib) (0.11.0)
    Requirement already satisfied: fonttools>=4.22.0 in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (from matplotlib) (4.25.0)
    Requirement already satisfied: kiwisolver>=1.0.1 in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (from matplotlib) (1.4.4)
    Requirement already satisfied: packaging>=20.0 in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (from matplotlib) (23.1)
    Requirement already satisfied: pillow>=6.2.0 in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (from matplotlib) (9.4.0)
    Requirement already satisfied: pyparsing<3.1,>=2.3.1 in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (from matplotlib) (3.0.9)
    Requirement already satisfied: six>=1.5 in /home/blaise-linux/anaconda3/lib/python3.11/site-packages (from python-dateutil>=2.8.2->pandas) (1.16.0)



```python
#load data
import pandas as pd
df = pd.read_csv('./data/pagespeed_metrics.csv')
```


```python
## Initial data exploration

# Display the first few rows of the DataFrame
df.head()

# Basic statistics
df.describe()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Performance Score</th>
      <th>Accessibility Score</th>
      <th>Best Practices Score</th>
      <th>First Contentful Paint (s)</th>
      <th>Total Blocking Time (ms)</th>
      <th>Largest Contentful Paint (s)</th>
      <th>Cumulative Layout Shift</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>3.000000</td>
      <td>3.000000</td>
      <td>3.000000</td>
      <td>3.000000</td>
      <td>3.000000</td>
      <td>3.000000</td>
      <td>3.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>36.666667</td>
      <td>94.333333</td>
      <td>96.666667</td>
      <td>1.233333</td>
      <td>36276.666667</td>
      <td>75.066667</td>
      <td>0.903667</td>
    </tr>
    <tr>
      <th>std</th>
      <td>20.502032</td>
      <td>5.507571</td>
      <td>2.886751</td>
      <td>0.251661</td>
      <td>62694.504810</td>
      <td>34.542920</td>
      <td>0.377790</td>
    </tr>
    <tr>
      <th>min</th>
      <td>13.000000</td>
      <td>89.000000</td>
      <td>95.000000</td>
      <td>1.000000</td>
      <td>10.000000</td>
      <td>35.600000</td>
      <td>0.585000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>30.500000</td>
      <td>91.500000</td>
      <td>95.000000</td>
      <td>1.100000</td>
      <td>80.000000</td>
      <td>62.700000</td>
      <td>0.695000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>48.000000</td>
      <td>94.000000</td>
      <td>95.000000</td>
      <td>1.200000</td>
      <td>150.000000</td>
      <td>89.800000</td>
      <td>0.805000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>48.500000</td>
      <td>97.000000</td>
      <td>97.500000</td>
      <td>1.350000</td>
      <td>54410.000000</td>
      <td>94.800000</td>
      <td>1.063000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>49.000000</td>
      <td>100.000000</td>
      <td>100.000000</td>
      <td>1.500000</td>
      <td>108670.000000</td>
      <td>99.800000</td>
      <td>1.321000</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Performance Score Analysis
import matplotlib.pyplot as plt

# Plotting the performance scores
plt.figure(figsize=(10, 6))
plt.bar(df['Environment'], df['Performance Score'], color='skyblue')
plt.xlabel('Environment')
plt.ylabel('Performance Score')
plt.title('Performance Scores Across Environments')
plt.show()
```


    
![png](SDCEngineerJournal_files/SDCEngineerJournal_4_0.png)
    



```python
## Analyzing Load Times

# Comparing FCP, TBT, and LCP
df.plot(x='Environment', y=['First Contentful Paint (s)', 'Total Blocking Time (ms)', 'Largest Contentful Paint (s)'], kind='bar', figsize=(12, 6))
plt.ylabel('Time (s or ms)')
plt.title('Comparison of Load Times')
plt.show()
```


    
![png](SDCEngineerJournal_files/SDCEngineerJournal_5_0.png)
    



```python
## Cumulative Layout Shift
df.plot(x='Environment', y='Cumulative Layout Shift', kind='bar', color='orange', figsize=(10, 6))
plt.ylabel('Cumulative Layout Shift')
plt.title('Cumulative Layout Shift Across Environments')
plt.show()
```


    
![png](SDCEngineerJournal_files/SDCEngineerJournal_6_0.png)
    


# V. Analysis and Conclusion

The transition to Next.js with SSR was undertaken to tap into the framework's potential for improved page speed and user experience. This section analyzes the performance across different environments and distills the insights gleaned from the data, highlighting the challenges encountered and the solutions applied.

## Challenges and Solutions
Rewriting the application to Next.js involved significant architectural changes. Server-side data fetching posed a challenge due to the inherent differences from client-side logic. Solutions included leveraging Next.js's `getServerSideProps` for fetching data required at the page level, ensuring content is rendered on the server and sent to the client ready for immediate display. Adaptations were also made to handle the state and context, which was initially tailored for a client-side React environment. Furthermore, the deployment constraints encountered with the Three.js component on the Render platform highlighted the versatility of Vercel's platform in accommodating such complex components within a Next.js application.

## Performance Improvements
The data shows that Next.js with SSR offers performance enhancements, especially in terms of First Contentful Paint (FCP) and Largest Contentful Paint (LCP), which are crucial metrics for perceived user speed. Notably, the optimized environment using Next.js without Three.js exhibited competitive performance metrics, suggesting that server-side rendering contributed to a more efficient loading process. The decision to selectively apply static generation or SSR based on the page requirements resulted in a notable improvement in load times, particularly for the home page, which now loads with greater speed and efficiency.

## Key Findings & Conclusion
The comparative analysis of different environments, as evidenced by the performance scores, load times, and visual stability metrics, affirms that Next.js with SSR is generally faster than the traditional React, Express, and Node setup. Although the inclusion of complex Three.js elements introduced performance trade-offs in terms of Total Blocking Time (TBT), the Next.js environment without Three.js demonstrated the potential for SSR to deliver content more quickly and improve overall page speed.

### Statistical Summary Insights
- **Performance Score**: The average performance score suggests that Next.js with SSR can deliver enhanced performance, barring scenarios with complex components like Three.js.
- **Accessibility and Best Practices**: The consistently high scores across environments reflect a strong adherence to web standards, which remains unaffected by the architectural changes.
- **First Contentful Paint (FCP) and Largest Contentful Paint (LCP)**: Next.js environments showed an improved FCP, with slight variances that underscore the importance of SSR in speeding up the initial rendering of content.
- **Cumulative Layout Shift (CLS)**: The low CLS in the Next.js environment with Three.js, despite its lower performance score, indicates that SSR can provide visual stability, an essential aspect of user experience.

In summary, the shift to Next.js with SSR, based on the collected data, resulted in a generally faster application. The benefits of SSR, such as improved SEO, faster initial page loads, and enhanced user experience, are clear indications that Next.js can serve as a robust solution for modern web applications seeking to optimize performance without compromising on functionality or user experience.


# VI. Reflection and Further Improvement

The journey from a PERN stack to a Next.js architecture has been both challenging and enlightening, offering numerous insights into system design and modern web development practices.

## Reflection on the Learning Process
Transitioning to Next.js illuminated the intricacies of server-side rendering and its impact on performance and SEO. The learning curve was steep; understanding Next.js's lifecycle methods and its seamless blend of server and client-side rendering required a paradigm shift from traditional React development. The project underscored the importance of component design, especially how state and context must be managed differently when pages are pre-rendered on the server. The integration of Three.js within Next.js also provided valuable lessons on handling dynamic imports and conditional rendering based on the environment (server or client).

## Recommendations for Future Projects
For future projects, the following optimizations and features are recommended:
- **Incremental Static Regeneration**: Leveraging Next.js's ability to update static pages after deployment without rebuilding the entire site can greatly improve performance for content-heavy applications.
- **API Route Optimization**: Exploring the full potential of Next.js API routes can simplify the backend architecture and improve response times.
- **Hybrid Rendering**: Combining SSR with Static Site Generation (SSG) where appropriate can optimize loading times for different types of content.
- **Edge Functions**: Utilize Vercel Edge Functions for caching and personalization at the CDN level, reducing server load and speeding up dynamic content delivery.

These strategies and more, derived from this project's challenges and successes, can be carried forward to enhance system design and user experience in future Next.js applications.

# VII. References

Throughout the project, the following resources provided invaluable guidance and insights:

- Next.js Documentation: https://nextjs.org/docs
- Vercel Documentation: https://vercel.com/docs
- React Documentation: https://reactjs.org/docs/getting-started.html
- MDN Web Docs: https://developer.mozilla.org
- Node.js Documentation: https://nodejs.org/en/docs/
- Express.js Guide: https://expressjs.com/en/guide/routing.html
- Google's PageSpeed Insights: https://developers.google.com/speed/pagespeed/insights/


These resources, combined with hands-on experimentation and problem-solving, formed the backbone of the learning process and the successful completion of the project.

