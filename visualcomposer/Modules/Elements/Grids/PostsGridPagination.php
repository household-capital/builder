<?php

namespace VisualComposer\Modules\Elements\Grids;

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Request;
use VisualComposer\Helpers\Traits\EventsFilters;
use WP_Query;

class PostsGridPagination extends Container implements Module
{
    use EventsFilters;

    protected $tags = [];

    public function __construct()
    {
        /** @see \VisualComposer\Modules\Elements\Grids\PostsGridPagination::addPagination */
        $this->addFilter('vcv:elements:grids:output', 'addPagination');
        /** @see \VisualComposer\Modules\Elements\Grids\PostsGridPagination::updatePosts */
        $this->addFilter('vcv:elements:grids:posts', 'updatePosts', 1);
    }

    protected function addPagination($output, $payload)
    {
        if ((int)$payload['atts']['pagination']) {
            $output .= vcview(
                'elements/grids/pagination',
                [
                    'payload' => $payload,
                    'tag' => $this->tags[ $payload['atts']['unique_id'] ],
                ]
            );
        }

        return $output;
    }

    protected function updatePosts($posts, $payload, Request $requestHelper)
    {
        global $post;
        $id = $payload['atts']['unique_id'];
        if ((int)$payload['atts']['pagination']) {
            $page = $requestHelper->exists('vcv-pagination-' . $id) ?
                (int)$requestHelper->input(
                    'vcv-pagination-' . $id
                ) : 1;
            $postIds = [];
            foreach ($posts as $postData) {
                $postIds[] = $postData->ID;
            }
            $perPage = (int)$payload['atts']['pagination_per_page'];
            $paginationQueryArgs = [
                'paged' => $page,
                'post__in' => $postIds,
                'posts_per_page' => $perPage,
            ];
            $paginationQuery = new WP_Query($paginationQueryArgs);
            $posts = [];
            while ($paginationQuery->have_posts()) {
                $paginationQuery->the_post();
                $posts[] = $post;
            }
            $this->tags[ $id ] = [
                'total_pages' => $paginationQuery->max_num_pages,
                'current_page' => $page,
                'per_page' => $perPage,
            ];
            if ($page > $paginationQuery->max_num_pages) {
                $posts = [];
            }
            wp_reset_postdata();
        }

        return $posts;
    }
}
