"use client";
import React from "react";
import { PanelTop, Facebook, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Expandable,
	ExpandableCard,
	ExpandableCardContent,
	ExpandableCardHeader,
	ExpandableContent,
	ExpandableTrigger,
} from "@/components/ui/expandable";
import Link from "next/link";

export default function SchoolShowcaseItem({ school }) {
  const { name, keyword, school_types = [], media = {} } = school;
  console.log("SCHOOL", school);
  const schoolTypes =
    school_types.length > 0
      ? school_types.map((type) => type.name)
      : ["Nieznany typ"];

	const schoolLinks = {
		website: media.page,
		facebook: media.facebook,
		instagram: media.instagram,
		tiktok: media.tiktok,
	};

  const features = [
    { icon: PanelTop, link: schoolLinks.website, name: "Strona internetowa" },
    { icon: Facebook, link: schoolLinks.facebook, name: "Facebook" },
    { icon: Instagram, link: schoolLinks.instagram, name: "Instagram" },
    { icon: FaTiktok, link: schoolLinks.tiktok, name: "Tik Tok" },
  ].filter((feature) => feature.link);

  return (
    <Expandable
      expandDirection="both"
      expandBehavior="replace"
    >
      {({ isExpanded }) => (
        <ExpandableTrigger>
          <ExpandableCard
            className="w-full mt-[45px] ml-1 relative transition-transform duration-300 hover:scale-105"
            collapsedSize={{ width: 390, height: 217 }}
            expandedSize={{ width: 390, height: 480 }}
            hoverToExpand={false}
            expandDelay={500}
            collapseDelay={700}
          >
            <ExpandableCardHeader>
              <div className="flex items-center flex-wrap gap-1">
                {schoolTypes.map((type, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </ExpandableCardHeader>

            <ExpandableCardContent>
              <div className="flex items-start">
                <div className="flex-1">
                  <h4
                    className="font-medium text-gray-800 dark:text-white tracking-tight transition-all duration-300"
                    style={{
                      fontSize: isExpanded ? "24px" : "18px",
                      fontWeight: isExpanded ? "700" : "400",
                    }}
                  >
                    {name}
                  </h4>
                </div>
              </div>
              <ExpandableContent
                preset="fade"
                keepMounted={false}
                animateIn={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    >
                      <feature.icon className="w-4 h-4 mr-2" />
                      <Link href={feature.link} target="_blank" className="">
                        {feature.name}
                      </Link>
                    </div>
                  ))}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={`/szkoly/${keyword}`}>Zobacz więcej</Link>
                  </Button>
                </div>
              </ExpandableContent>
            </ExpandableCardContent>
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  );
}
