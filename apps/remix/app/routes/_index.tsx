import type { MetaFunction } from "@remix-run/node";
import { Header } from "../components/Header";
import { BannerEvents } from "../components/BannerEvents";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      {/* {% include header.html %} */}
      <Header />

      <div className="banner events-banner" id="top">
        {/* {% include banner-events.html %} */}
        <BannerEvents />
      </div>

      {/* <main>
      {% include title-bar.html %}

      <ol class="grid events-grid">
        {% assign today = 'now' | date: '%Y-%m-%d' %} {% assign sorted_posts =
        site.posts | sort: 'datestart' %} {% for post in sorted_posts %} {%
        assign post_start_date = post.datestart | date: '%Y-%m-%d' %} {% if
        post_start_date >= today %}
        <!-- prettier-ignore -->
        {% assign location_parts = post.location | split: ',' %}
        {% assign country_part = location_parts | last | strip %}
        {% assign country = country_part %} 

        {% case country %}
          {% when 'Algeria' %} {% assign flag = '🇩🇿' %}
          {% when 'Argentina' %} {% assign flag = '🇦🇷' %}
          {% when 'Australia' %} {% assign flag = '🇦🇺' %}
          {% when 'Austria' %} {% assign flag = '🇦🇹' %}
          {% when 'Belgium' %} {% assign flag = '🇧🇪' %}
          {% when 'Brazil' %} {% assign flag = '🇧🇷' %}
          {% when 'Canada' %} {% assign flag = '🇨🇦' %}
          {% when 'Chile' %} {% assign flag = '🇨🇱' %}
          {% when 'China' %} {% assign flag = '🇨🇳' %}
          {% when 'Croatia' %} {% assign flag = '🇭🇷' %}
          {% when 'Czech Republic' %} {% assign flag = '🇨🇿' %}
          {% when 'Denmark' %} {% assign flag = '🇩🇰' %}
          {% when 'Egypt' %} {% assign flag = '🇪🇬' %}
          {% when 'Finland' %} {% assign flag = '🇫🇮' %}
          {% when 'France' %} {% assign flag = '🇫🇷' %}
          {% when 'Germany' %} {% assign flag = '🇩🇪' %}
          {% when 'Greece' %} {% assign flag = '🇬🇷' %}
          {% when 'Hungary' %} {% assign flag = '🇭🇺' %}
          {% when 'India' %} {% assign flag = '🇮🇳' %}
          {% when 'Italy' %} {% assign flag = '🇮🇹' %}
          {% when 'Japan' %} {% assign flag = '🇯🇵' %}
          {% when 'Mexico' %} {% assign flag = '🇲🇽' %}
          {% when 'Netherlands' %} {% assign flag = '🇳🇱' %}
          {% when 'Norway' %} {% assign flag = '🇳🇴' %}
          {% when 'Poland' %} {% assign flag = '🇵🇱' %}
          {% when 'Portugal' %} {% assign flag = '🇵🇹' %}
          {% when 'Russia' %} {% assign flag = '🇷🇺' %}
          {% when 'South Africa' %} {% assign flag = '🇿🇦' %}
          {% when 'South Korea' %} {% assign flag = '🇰🇷' %}
          {% when 'Spain' %} {% assign flag = '🇪🇸' %}
          {% when 'Sweden' %} {% assign flag = '🇸🇪' %}
          {% when 'Switzerland' %} {% assign flag = '🇨🇭' %}
          {% when 'United Kingdom' %} {% assign flag = '🇬🇧' %}
          {% when 'United States' %} {% assign flag = '🇺🇸' %}
          {% when 'Venezuela' %} {% assign flag = '🇻🇪' %}
        {%- else -%}
          {% assign flag = '' %}
        {% endcase %}

        {% assign average_color = site.data.average_colors[post.slug] %}
        <li
          class="grid-item events-grid-item {% for host in post.hosts %}filter-host-{{ host | slugify }} {% endfor %}"
          style="
            --xxx-color-background: {{ average_color }};
            {% if post.foreground %}
            --xxx-color-text: color-mix(in srgb, {{ average_color }}, black 80%);
            --xxx-color-text-muted: color-mix(in srgb, {{ average_color }} 50%, black 50%);
            --xxx-color-accent: color-mix(in srgb, {{ average_color }} 100%, black 25%);
            {% else %}
            --xxx-color-text: color-mix(in srgb, {{ average_color }}, white 80%);
            --xxx-color-text-muted: color-mix(in srgb, {{ average_color }} 50%, white 50%);
            --xxx-color-accent: color-mix(in srgb, {{ average_color }} 100%, white 25%);
            {% endif %}
          "
          id="grid-item-{{ forloop.index }}"
          data-location="{{ country_part | slugify }}"
          {% if post.is_online == true %}
            data-virtual
          {% endif %}
          {%
          if
          post.featured
          %}
          data-featured="true"
          {%
          endif
          %}
        >
          {% if post.featured and post.video %}
          <video
            autoplay
            muted
            loop
            playsinline
            poster="/.netlify/images/?url={{ post.image }}&fit=cover&h=300"
            class="grid-item-image"
          >
            <source
              src="/assets/video/events/{{ post.title | slugify }}.mp4"
              type="video/mp4"
            />
            <source
              src="/assets/video/events/{{ post.title | slugify }}.ogv"
              type="video/ogv"
            />
            <source
              src="/assets/video/events/{{ post.title | slugify }}.webm"
              type="video/webm"
            />
          </video>
          {% endif %}
          <img
            class="grid-item-image"
            srcset="/.netlify/images/?url={{ post.image }}&fit=cover&h=600 2x, /.netlify/images/?url={{ post.image }}&fit=cover&h=900 3x"
            src="/.netlify/images/?url={{ post.image }}&fit=cover&h=300"
            alt="{{ post.title | smartify }} image"
            data-index="{{ forloop.index }}"
            draggable="false"
            style="view-transition-name: post-image-{{ post.title | slugify }};"
          />
          <div class="grid-item-metadata">
            <a
              class="grid-item-metadata-title grid-item-anchor"
              href="{{ post.url }}"
              style="view-transition-name: post-title-{{ post.title | slugify }};"
              >{{ post.title | smartify }}</a
            >
            <div class="grid-item-metadata-subtitle">
              <time datetime="{{ post.datestart | date: '%Y-%m-%d' }}">
                {{ post.datestart | date: "%b %d" }}
              </time>

              {% if post.dateend %} &nbsp;–&nbsp;
              <time datetime="{{ post.dateend | date: '%Y-%m-%d' }}">
                {{ post.dateend | date: "%b %d" }}
              </time>
              {% endif %}
            </div>
            <div class="grid-item-metadata-symbol">
              {% if post.is_online %}🛰️{% endif %} {{ flag }}
            </div>
            {% assign today = 'now' | date: '%Y-%m-%d' %} {% assign start_date =
            post.datestart | date: '%Y-%m-%d' %} {% assign end_date =
            post.dateend | date: '%Y-%m-%d' %} {% if post.dateend %} {% if today
            >= start_date and today <= end_date %}
            <div class="event-list-item-status">Today</div>
            {% endif %} {% else %} {% if today == start_date %}
            <div class="event-list-item-status">Today</div>
            {% endif %} {% endif %}
          </div>
        </li>
        {% endif %} {% endfor %}
      </ol>
      <div class="events-empty-state" style="display: none">
        <div class="events-empty-state-emoji">🔇</div>
        <h2>No upcoming events found.</h2>
        <p>Do you know of an event that should be listed here?</p>
        <button
          aria-label="Add event"
          class="button"
          data-variant="call-to-action"
          onclick="document.getElementById('add-event').show()"
        >
          Add an event
        </button>
      </div>
    </main>

    {% include footer.html %} {% include dialog.html %} {% include scripts.html
    %} */}
    </>
  );
}
