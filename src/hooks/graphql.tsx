import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CommentCreateParameters = {
  content?: InputMaybe<Scalars['String']>;
  post: Scalars['String'];
};

export type CommentModel = {
  __typename?: 'CommentModel';
  content: Scalars['String'];
  created: Scalars['DateTime'];
  creator: UserModel;
  id: Scalars['String'];
  post: PostModel;
  removed?: Maybe<Scalars['DateTime']>;
};

export type FeedModel = {
  __typename?: 'FeedModel';
  id: Scalars['String'];
  name: Scalars['String'];
  posts: Array<PostModel>;
  removed?: Maybe<Scalars['DateTime']>;
  users: Array<UserFeedRelationModel>;
};


export type FeedModelPostsArgs = {
  filter?: InputMaybe<PostFindParameters>;
};

export type MediaModel = {
  __typename?: 'MediaModel';
  aspect?: Maybe<Scalars['Float']>;
  contentType?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  creator: UserModel;
  filename?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lowres?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Float']>;
  removed?: Maybe<Scalars['DateTime']>;
  size: Scalars['Float'];
  type?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToFeed: UserFeedRelationModel;
  createAuthToken: Scalars['String'];
  createComment: CommentModel;
  createFeed: FeedModel;
  createPost: PostModel;
  inviteProfile: UserModel;
  registerPushNotification: PushRegistrationModel;
  removeFeed: Scalars['Boolean'];
  removePost: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
  removeUserFromFeed: Scalars['Boolean'];
  setProfileAvatar: UserModel;
};


export type MutationAddUserToFeedArgs = {
  accessType: Scalars['String'];
  feedId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateAuthTokenArgs = {
  secret: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  params: CommentCreateParameters;
};


export type MutationCreateFeedArgs = {
  name: Scalars['String'];
};


export type MutationCreatePostArgs = {
  params: PostCreateParameters;
};


export type MutationInviteProfileArgs = {
  email: Scalars['String'];
};


export type MutationRegisterPushNotificationArgs = {
  token: Scalars['String'];
};


export type MutationRemoveFeedArgs = {
  feedId: Scalars['String'];
};


export type MutationRemovePostArgs = {
  id: Scalars['String'];
};


export type MutationRemoveUserArgs = {
  userId: Scalars['String'];
};


export type MutationRemoveUserFromFeedArgs = {
  feedId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationSetProfileAvatarArgs = {
  mediaId?: InputMaybe<Scalars['String']>;
};

export type PostCreateParameters = {
  body?: InputMaybe<Scalars['String']>;
  feed: Scalars['String'];
  media: Array<Scalars['String']>;
};

export type PostFindParameters = {
  after?: InputMaybe<Scalars['DateTime']>;
  feeds?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};

export type PostModel = {
  __typename?: 'PostModel';
  body?: Maybe<Scalars['String']>;
  commentCount: Scalars['Float'];
  comments: Array<CommentModel>;
  created: Scalars['DateTime'];
  creator?: Maybe<UserModel>;
  feed: FeedModel;
  id: Scalars['String'];
  media: Array<MediaModel>;
  removed?: Maybe<Scalars['DateTime']>;
};

export type PushRegistrationModel = {
  __typename?: 'PushRegistrationModel';
  device?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allFeeds: Array<FeedModel>;
  feed: FeedModel;
  feeds: Array<FeedModel>;
  post: PostModel;
  posts: Array<PostModel>;
  profile?: Maybe<UserModel>;
  users: Array<UserModel>;
};


export type QueryFeedArgs = {
  id: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  filter: PostFindParameters;
};

export type UserFeedRelationModel = {
  __typename?: 'UserFeedRelationModel';
  accessType: Scalars['String'];
  feed: FeedModel;
  user: UserModel;
};

export type UserModel = {
  __typename?: 'UserModel';
  admin: Scalars['Boolean'];
  avatar?: Maybe<Scalars['String']>;
  feeds: Array<UserFeedRelationModel>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  removed?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type CreateCommentMutationVariables = Exact<{
  params: CommentCreateParameters;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentModel', id: string } };

export type FeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedsQuery = { __typename?: 'Query', feeds: Array<{ __typename?: 'FeedModel', id: string, name: string, posts: Array<{ __typename?: 'PostModel', id: string, body?: string | null, media: Array<{ __typename?: 'MediaModel', id: string }> }> }> };

export type AllFeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllFeedsQuery = { __typename?: 'Query', allFeeds: Array<{ __typename?: 'FeedModel', id: string, name: string, users: Array<{ __typename?: 'UserFeedRelationModel', accessType: string, user: { __typename?: 'UserModel', name?: string | null, username: string } }> }> };

export type FeedQueryVariables = Exact<{
  feedId: Scalars['String'];
}>;


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'FeedModel', id: string, name: string, users: Array<{ __typename?: 'UserFeedRelationModel', accessType: string, user: { __typename?: 'UserModel', id: string, name?: string | null, username: string } }> } };

export type CreateFeedMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateFeedMutation = { __typename?: 'Mutation', createFeed: { __typename?: 'FeedModel', id: string } };

export type AddUserToFeedMutationVariables = Exact<{
  accessType: Scalars['String'];
  userId: Scalars['String'];
  feedId: Scalars['String'];
}>;


export type AddUserToFeedMutation = { __typename?: 'Mutation', addUserToFeed: { __typename?: 'UserFeedRelationModel', accessType: string } };

export type RemoveUserFromFeedMutationVariables = Exact<{
  userId: Scalars['String'];
  feedId: Scalars['String'];
}>;


export type RemoveUserFromFeedMutation = { __typename?: 'Mutation', removeUserFromFeed: boolean };

export type RemoveFeedMutationVariables = Exact<{
  feedId: Scalars['String'];
}>;


export type RemoveFeedMutation = { __typename?: 'Mutation', removeFeed: boolean };

export type PostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'PostModel', id: string, created: any, creator?: { __typename?: 'UserModel', id: string, name?: string | null, avatar?: string | null, username: string } | null, comments: Array<{ __typename?: 'CommentModel', id: string, content: string, created: any, creator: { __typename?: 'UserModel', username: string, name?: string | null, id: string, avatar?: string | null } }>, media: Array<{ __typename?: 'MediaModel', id: string, contentType?: string | null, lowres?: string | null, aspect?: number | null, order?: number | null, created?: any | null, type?: string | null }> } };

export type PostsQueryVariables = Exact<{
  filter: PostFindParameters;
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'PostModel', id: string, body?: string | null, commentCount: number, created: any, creator?: { __typename?: 'UserModel', name?: string | null, username: string, avatar?: string | null } | null, media: Array<{ __typename?: 'MediaModel', id: string, aspect?: number | null, type?: string | null }> }> };

export type CreatePostMutationVariables = Exact<{
  params: PostCreateParameters;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostModel', id: string } };

export type RemovePostMutationVariables = Exact<{
  removePostId: Scalars['String'];
}>;


export type RemovePostMutation = { __typename?: 'Mutation', removePost: boolean };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'UserModel', id: string, username: string, name?: string | null, admin: boolean, avatar?: string | null, feeds: Array<{ __typename?: 'UserFeedRelationModel', accessType: string, feed: { __typename?: 'FeedModel', id: string, name: string } }> } | null };

export type SetProfileAvatarMutationVariables = Exact<{
  mediaId?: InputMaybe<Scalars['String']>;
}>;


export type SetProfileAvatarMutation = { __typename?: 'Mutation', setProfileAvatar: { __typename?: 'UserModel', id: string } };

export type InviteProfileMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type InviteProfileMutation = { __typename?: 'Mutation', inviteProfile: { __typename?: 'UserModel', id: string } };

export type RegisterPushNotificationMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type RegisterPushNotificationMutation = { __typename?: 'Mutation', registerPushNotification: { __typename?: 'PushRegistrationModel', id: string } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'UserModel', id: string, name?: string | null, username: string, avatar?: string | null }> };

export type RemoveUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: boolean };


export const CreateCommentDocument = gql`
    mutation CreateComment($params: CommentCreateParameters!) {
  createComment(params: $params) {
    id
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const FeedsDocument = gql`
    query Feeds {
  feeds {
    id
    name
    posts {
      id
      body
      media {
        id
      }
    }
  }
}
    `;

/**
 * __useFeedsQuery__
 *
 * To run a query within a React component, call `useFeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeedsQuery(baseOptions?: Apollo.QueryHookOptions<FeedsQuery, FeedsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedsQuery, FeedsQueryVariables>(FeedsDocument, options);
      }
export function useFeedsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedsQuery, FeedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedsQuery, FeedsQueryVariables>(FeedsDocument, options);
        }
export type FeedsQueryHookResult = ReturnType<typeof useFeedsQuery>;
export type FeedsLazyQueryHookResult = ReturnType<typeof useFeedsLazyQuery>;
export type FeedsQueryResult = Apollo.QueryResult<FeedsQuery, FeedsQueryVariables>;
export const AllFeedsDocument = gql`
    query AllFeeds {
  allFeeds {
    id
    name
    users {
      accessType
      user {
        name
        username
      }
    }
  }
}
    `;

/**
 * __useAllFeedsQuery__
 *
 * To run a query within a React component, call `useAllFeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllFeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllFeedsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllFeedsQuery(baseOptions?: Apollo.QueryHookOptions<AllFeedsQuery, AllFeedsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllFeedsQuery, AllFeedsQueryVariables>(AllFeedsDocument, options);
      }
export function useAllFeedsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllFeedsQuery, AllFeedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllFeedsQuery, AllFeedsQueryVariables>(AllFeedsDocument, options);
        }
export type AllFeedsQueryHookResult = ReturnType<typeof useAllFeedsQuery>;
export type AllFeedsLazyQueryHookResult = ReturnType<typeof useAllFeedsLazyQuery>;
export type AllFeedsQueryResult = Apollo.QueryResult<AllFeedsQuery, AllFeedsQueryVariables>;
export const FeedDocument = gql`
    query Feed($feedId: String!) {
  feed(id: $feedId) {
    id
    name
    users {
      accessType
      user {
        id
        name
        username
      }
    }
  }
}
    `;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      feedId: // value for 'feedId'
 *   },
 * });
 */
export function useFeedQuery(baseOptions: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const CreateFeedDocument = gql`
    mutation CreateFeed($name: String!) {
  createFeed(name: $name) {
    id
  }
}
    `;
export type CreateFeedMutationFn = Apollo.MutationFunction<CreateFeedMutation, CreateFeedMutationVariables>;

/**
 * __useCreateFeedMutation__
 *
 * To run a mutation, you first call `useCreateFeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFeedMutation, { data, loading, error }] = useCreateFeedMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateFeedMutation(baseOptions?: Apollo.MutationHookOptions<CreateFeedMutation, CreateFeedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFeedMutation, CreateFeedMutationVariables>(CreateFeedDocument, options);
      }
export type CreateFeedMutationHookResult = ReturnType<typeof useCreateFeedMutation>;
export type CreateFeedMutationResult = Apollo.MutationResult<CreateFeedMutation>;
export type CreateFeedMutationOptions = Apollo.BaseMutationOptions<CreateFeedMutation, CreateFeedMutationVariables>;
export const AddUserToFeedDocument = gql`
    mutation AddUserToFeed($accessType: String!, $userId: String!, $feedId: String!) {
  addUserToFeed(accessType: $accessType, userId: $userId, feedId: $feedId) {
    accessType
  }
}
    `;
export type AddUserToFeedMutationFn = Apollo.MutationFunction<AddUserToFeedMutation, AddUserToFeedMutationVariables>;

/**
 * __useAddUserToFeedMutation__
 *
 * To run a mutation, you first call `useAddUserToFeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToFeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToFeedMutation, { data, loading, error }] = useAddUserToFeedMutation({
 *   variables: {
 *      accessType: // value for 'accessType'
 *      userId: // value for 'userId'
 *      feedId: // value for 'feedId'
 *   },
 * });
 */
export function useAddUserToFeedMutation(baseOptions?: Apollo.MutationHookOptions<AddUserToFeedMutation, AddUserToFeedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserToFeedMutation, AddUserToFeedMutationVariables>(AddUserToFeedDocument, options);
      }
export type AddUserToFeedMutationHookResult = ReturnType<typeof useAddUserToFeedMutation>;
export type AddUserToFeedMutationResult = Apollo.MutationResult<AddUserToFeedMutation>;
export type AddUserToFeedMutationOptions = Apollo.BaseMutationOptions<AddUserToFeedMutation, AddUserToFeedMutationVariables>;
export const RemoveUserFromFeedDocument = gql`
    mutation RemoveUserFromFeed($userId: String!, $feedId: String!) {
  removeUserFromFeed(userId: $userId, feedId: $feedId)
}
    `;
export type RemoveUserFromFeedMutationFn = Apollo.MutationFunction<RemoveUserFromFeedMutation, RemoveUserFromFeedMutationVariables>;

/**
 * __useRemoveUserFromFeedMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromFeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromFeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromFeedMutation, { data, loading, error }] = useRemoveUserFromFeedMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      feedId: // value for 'feedId'
 *   },
 * });
 */
export function useRemoveUserFromFeedMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserFromFeedMutation, RemoveUserFromFeedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserFromFeedMutation, RemoveUserFromFeedMutationVariables>(RemoveUserFromFeedDocument, options);
      }
export type RemoveUserFromFeedMutationHookResult = ReturnType<typeof useRemoveUserFromFeedMutation>;
export type RemoveUserFromFeedMutationResult = Apollo.MutationResult<RemoveUserFromFeedMutation>;
export type RemoveUserFromFeedMutationOptions = Apollo.BaseMutationOptions<RemoveUserFromFeedMutation, RemoveUserFromFeedMutationVariables>;
export const RemoveFeedDocument = gql`
    mutation RemoveFeed($feedId: String!) {
  removeFeed(feedId: $feedId)
}
    `;
export type RemoveFeedMutationFn = Apollo.MutationFunction<RemoveFeedMutation, RemoveFeedMutationVariables>;

/**
 * __useRemoveFeedMutation__
 *
 * To run a mutation, you first call `useRemoveFeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFeedMutation, { data, loading, error }] = useRemoveFeedMutation({
 *   variables: {
 *      feedId: // value for 'feedId'
 *   },
 * });
 */
export function useRemoveFeedMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFeedMutation, RemoveFeedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFeedMutation, RemoveFeedMutationVariables>(RemoveFeedDocument, options);
      }
export type RemoveFeedMutationHookResult = ReturnType<typeof useRemoveFeedMutation>;
export type RemoveFeedMutationResult = Apollo.MutationResult<RemoveFeedMutation>;
export type RemoveFeedMutationOptions = Apollo.BaseMutationOptions<RemoveFeedMutation, RemoveFeedMutationVariables>;
export const PostDocument = gql`
    query Post($postId: String!) {
  post(id: $postId) {
    id
    creator {
      id
      name
      avatar
      username
    }
    created
    comments {
      id
      creator {
        username
        name
        id
        avatar
      }
      content
      created
    }
    media {
      id
      contentType
      lowres
      aspect
      order
      created
      type
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($filter: PostFindParameters!) {
  posts(filter: $filter) {
    id
    body
    commentCount
    creator {
      name
      username
      avatar
    }
    created
    media {
      id
      aspect
      type
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($params: PostCreateParameters!) {
  createPost(params: $params) {
    id
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const RemovePostDocument = gql`
    mutation RemovePost($removePostId: String!) {
  removePost(id: $removePostId)
}
    `;
export type RemovePostMutationFn = Apollo.MutationFunction<RemovePostMutation, RemovePostMutationVariables>;

/**
 * __useRemovePostMutation__
 *
 * To run a mutation, you first call `useRemovePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePostMutation, { data, loading, error }] = useRemovePostMutation({
 *   variables: {
 *      removePostId: // value for 'removePostId'
 *   },
 * });
 */
export function useRemovePostMutation(baseOptions?: Apollo.MutationHookOptions<RemovePostMutation, RemovePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePostMutation, RemovePostMutationVariables>(RemovePostDocument, options);
      }
export type RemovePostMutationHookResult = ReturnType<typeof useRemovePostMutation>;
export type RemovePostMutationResult = Apollo.MutationResult<RemovePostMutation>;
export type RemovePostMutationOptions = Apollo.BaseMutationOptions<RemovePostMutation, RemovePostMutationVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    id
    username
    name
    admin
    avatar
    feeds {
      feed {
        id
        name
      }
      accessType
    }
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const SetProfileAvatarDocument = gql`
    mutation SetProfileAvatar($mediaId: String) {
  setProfileAvatar(mediaId: $mediaId) {
    id
  }
}
    `;
export type SetProfileAvatarMutationFn = Apollo.MutationFunction<SetProfileAvatarMutation, SetProfileAvatarMutationVariables>;

/**
 * __useSetProfileAvatarMutation__
 *
 * To run a mutation, you first call `useSetProfileAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetProfileAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setProfileAvatarMutation, { data, loading, error }] = useSetProfileAvatarMutation({
 *   variables: {
 *      mediaId: // value for 'mediaId'
 *   },
 * });
 */
export function useSetProfileAvatarMutation(baseOptions?: Apollo.MutationHookOptions<SetProfileAvatarMutation, SetProfileAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetProfileAvatarMutation, SetProfileAvatarMutationVariables>(SetProfileAvatarDocument, options);
      }
export type SetProfileAvatarMutationHookResult = ReturnType<typeof useSetProfileAvatarMutation>;
export type SetProfileAvatarMutationResult = Apollo.MutationResult<SetProfileAvatarMutation>;
export type SetProfileAvatarMutationOptions = Apollo.BaseMutationOptions<SetProfileAvatarMutation, SetProfileAvatarMutationVariables>;
export const InviteProfileDocument = gql`
    mutation InviteProfile($email: String!) {
  inviteProfile(email: $email) {
    id
  }
}
    `;
export type InviteProfileMutationFn = Apollo.MutationFunction<InviteProfileMutation, InviteProfileMutationVariables>;

/**
 * __useInviteProfileMutation__
 *
 * To run a mutation, you first call `useInviteProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteProfileMutation, { data, loading, error }] = useInviteProfileMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useInviteProfileMutation(baseOptions?: Apollo.MutationHookOptions<InviteProfileMutation, InviteProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteProfileMutation, InviteProfileMutationVariables>(InviteProfileDocument, options);
      }
export type InviteProfileMutationHookResult = ReturnType<typeof useInviteProfileMutation>;
export type InviteProfileMutationResult = Apollo.MutationResult<InviteProfileMutation>;
export type InviteProfileMutationOptions = Apollo.BaseMutationOptions<InviteProfileMutation, InviteProfileMutationVariables>;
export const RegisterPushNotificationDocument = gql`
    mutation RegisterPushNotification($token: String!) {
  registerPushNotification(token: $token) {
    id
  }
}
    `;
export type RegisterPushNotificationMutationFn = Apollo.MutationFunction<RegisterPushNotificationMutation, RegisterPushNotificationMutationVariables>;

/**
 * __useRegisterPushNotificationMutation__
 *
 * To run a mutation, you first call `useRegisterPushNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterPushNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerPushNotificationMutation, { data, loading, error }] = useRegisterPushNotificationMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRegisterPushNotificationMutation(baseOptions?: Apollo.MutationHookOptions<RegisterPushNotificationMutation, RegisterPushNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterPushNotificationMutation, RegisterPushNotificationMutationVariables>(RegisterPushNotificationDocument, options);
      }
export type RegisterPushNotificationMutationHookResult = ReturnType<typeof useRegisterPushNotificationMutation>;
export type RegisterPushNotificationMutationResult = Apollo.MutationResult<RegisterPushNotificationMutation>;
export type RegisterPushNotificationMutationOptions = Apollo.BaseMutationOptions<RegisterPushNotificationMutation, RegisterPushNotificationMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    name
    username
    avatar
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($userId: String!) {
  removeUser(userId: $userId)
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;