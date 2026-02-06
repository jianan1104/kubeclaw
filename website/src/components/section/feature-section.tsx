"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { SectionHeader } from "../section-header";
import { Icons } from "../icons";
import { HeaderBadge } from "../header-badge";
import { OrbitingIconsBurst } from "@/components/animations/orbiting-icons-burst";
import { DottedMap } from "@/components/ui/dotted-map";
import { LazyDither } from "@/components/animations/lazy-dither";

const featureConfig = siteConfig.featureSection;

export function FeatureSection() {

    return (
        <section id="features" className="w-full relative">
            <SectionHeader>
                <div className="flex flex-col items-center justify-center">
                    <HeaderBadge icon={featureConfig.badge.icon} text={featureConfig.badge.text} />
                    <div className="flex flex-col items-center justify-center gap-4 mt-4">
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium tracking-tighter text-center text-balance">
                            {featureConfig.title}
                        </h2>
                        <p className="text-muted-foreground md:text-lg text-center text-balance mx-auto">
                            {featureConfig.description}
                        </p>
                    </div>
                </div>
            </SectionHeader>
            <div className="relative h-14 overflow-hidden">
                <div className="absolute inset-0">
                    <LazyDither enableMouseInteraction={true} />
                </div>
            </div>
            <div className="mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-6">
                    {/* Left Column - Sticky Description */}
                    <div className="col-span-1 md:col-span-2 p-8 md:p-10 lg:p-14 md:sticky md:top-20 md:self-start flex flex-col gap-7">
                        <h3 className="text-3xl lg:text-4xl font-medium tracking-tighter text-left text-balance">
                            {featureConfig.sections.title}
                        </h3>
                        <p className="text-muted-foreground text-left text-balance">
                            {featureConfig.sections.description}
                        </p>
                        <Button variant="secondary" className="w-fit border border-border">
                            {featureConfig.sections.ctaButton.text}
                            <Icons.arrowRight className="size-4 text-foreground" />
                        </Button>
                    </div>

                    {/* Right Column - Animated Blocks */}
                    <div className="col-span-1 md:col-span-4 w-full border-t md:border-t-0 md:border-l border-border relative">
                        <div className="w-full divide-y divide-border">
                            <div className="relative">
                                <OrbitingIconsBurst
                                    items={[
                                        {
                                            id: 1,
                                            delay: 0,
                                            rayIndex: 10,
                                            distance: 152,
                                            className: "",
                                            icon: <Icons.vercel className="size-full" />,
                                        },
                                        {
                                            id: 2,
                                            delay: 0.08,
                                            rayIndex: 14,
                                            distance: 138,
                                            className: "",
                                            icon: (
                                                <Icons.vercel className="size-full" />
                                            ),
                                        },
                                        {
                                            id: 3,
                                            delay: 0.16,
                                            rayIndex: 19,
                                            distance: 178,
                                            className: "",
                                            icon: (
                                                <Icons.vercel className="size-full" />
                                            ),
                                        },
                                        {
                                            id: 4,
                                            delay: 0.24,
                                            rayIndex: 22,
                                            distance: 144,
                                            className: "",
                                            icon: (
                                                <Icons.vercel className="size-full" />
                                            ),
                                        },
                                        {
                                            id: 5,
                                            delay: 0.48,
                                            rayIndex: 4,
                                            distance: 156,
                                            className: "",
                                            icon: (
                                                <Icons.vercel className="size-full" />
                                            ),
                                        },
                                        {
                                            id: 6,
                                            delay: 0.56,
                                            rayIndex: 7,
                                            distance: 170,
                                            className: "",
                                            icon: (
                                                <Icons.vercel className="size-full" />
                                            ),
                                        },
                                    ]}
                                    lineCount={22}
                                    centerIcon={<Icons.vercel className="size-full" />}
                                    className="relative min-h-[300px] md:min-h-[400px] mask-[radial-gradient(ellipse_at_center,black_40%,black_60%,transparent_85%)]"
                                />
                                <div className="max-w-xl text-left items-start p-6">
                                    <p className="text-sm text-muted-foreground flex items-center gap-3 justify-start">
                                        {featureConfig.sections.blocks[0].icon}
                                        {featureConfig.sections.blocks[0].title}
                                    </p>
                                    <p className="text-base text-foreground leading-relaxed mt-2">
                                        {featureConfig.sections.blocks[0].description}
                                    </p>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative min-h-[300px] md:min-h-[400px] overflow-hidden mask-[radial-gradient(ellipse_at_center,black_40%,black_60%,transparent_85%)]">
                                    <div className="absolute inset-0 bg-radial from-transparent to-background to-70%" />
                                    <DottedMap
                                        markers={[
                                            { lat: 40.7128, lng: -74.006, size: 0.3 },
                                            { lat: 34.0522, lng: -118.2437, size: 0.3 },
                                            { lat: 51.5074, lng: -0.1278, size: 0.3 },
                                            { lat: -33.8688, lng: 151.2093, size: 0.3 },
                                            { lat: 48.8566, lng: 2.3522, size: 0.3 },
                                            { lat: 35.6762, lng: 139.6503, size: 0.3 },
                                            { lat: 55.7558, lng: 37.6176, size: 0.3 },
                                            { lat: 39.9042, lng: 116.4074, size: 0.3 },
                                            { lat: 28.6139, lng: 77.209, size: 0.3 },
                                            { lat: -23.5505, lng: -46.6333, size: 0.3 },
                                            { lat: 1.3521, lng: 103.8198, size: 0.3 },
                                            { lat: 25.2048, lng: 55.2708, size: 0.3 },
                                            { lat: 52.52, lng: 13.405, size: 0.3 },
                                            { lat: 19.4326, lng: -99.1332, size: 0.3 },
                                            { lat: -26.2041, lng: 28.0473, size: 0.3 },
                                        ]}
                                    />
                                </div>
                                <div className="max-w-xl text-left items-start p-6">
                                    <p className="text-sm text-muted-foreground flex items-center gap-3 justify-start">
                                        {featureConfig.sections.blocks[1].icon}
                                        {featureConfig.sections.blocks[1].title}
                                    </p>
                                    <p className="text-base text-foreground leading-relaxed mt-2">
                                        {featureConfig.sections.blocks[1].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
